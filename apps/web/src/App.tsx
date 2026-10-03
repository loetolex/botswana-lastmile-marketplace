import { useEffect, useMemo, useState } from "react";
import { Bike, House, LayoutDashboard, Search, Store, UserRound, UtensilsCrossed } from "lucide-react";
import type { UserRole } from "@loetogo/domain";
import { DynamicArrayField } from "./components/DynamicArrayField";
import { storage } from "./lib/storage";

const roleCopy: Record<UserRole, { title: string; subtitle: string; actions: string[] }> = {
  client: {
    title: "What can we bring you?",
    subtitle: "Food, groceries, pharmacy and local shops around Botswana.",
    actions: ["Food", "Groceries", "Pharmacy", "Parcel"]
  },
  driver: {
    title: "Ready to earn?",
    subtitle: "Go online, review transparent offers and manage today's deliveries.",
    actions: ["Go online", "Offers", "Active job", "Earnings"]
  },
  restaurant: {
    title: "Run your store",
    subtitle: "Manage orders, prep time, menu availability and settlement snapshots.",
    actions: ["Orders", "Menu", "Prep time", "Earnings"]
  },
  admin: {
    title: "Loeto Go operations",
    subtitle: "Monitor the marketplace across customers, merchants and drivers.",
    actions: ["Live orders", "Drivers", "Restaurants", "Disputes"]
  }
};

const navByRole: Record<UserRole, { label: string; icon: typeof House }[]> = {
  client: [
    { label: "Home", icon: House },
    { label: "Search", icon: Search },
    { label: "Orders", icon: UtensilsCrossed },
    { label: "Profile", icon: UserRound }
  ],
  driver: [
    { label: "Home", icon: Bike },
    { label: "Offers", icon: Search },
    { label: "Earnings", icon: LayoutDashboard },
    { label: "Profile", icon: UserRound }
  ],
  restaurant: [
    { label: "Home", icon: Store },
    { label: "Orders", icon: UtensilsCrossed },
    { label: "Menu", icon: LayoutDashboard },
    { label: "Profile", icon: UserRound }
  ],
  admin: [
    { label: "Overview", icon: LayoutDashboard },
    { label: "Orders", icon: UtensilsCrossed },
    { label: "Partners", icon: Store },
    { label: "Account", icon: UserRound }
  ]
};

export function App() {
  const [role, setRole] = useState<UserRole>("client");
  const [active, setActive] = useState("Home");
  const [preferences, setPreferences] = useState<string[]>(["Fast delivery"]);
  const current = roleCopy[role];
  const nav = useMemo(() => navByRole[role], [role]);

  useEffect(() => {
    storage.get<UserRole>("loetogo.role", "client").then(setRole);
    storage.get<string[]>("loetogo.preferences", ["Fast delivery"]).then(setPreferences);
  }, []);

  const selectRole = (next: UserRole) => {
    setRole(next);
    setActive(navByRole[next][0].label);
    storage.set("loetogo.role", next);
  };

  const setPrefs = (next: string[]) => {
    setPreferences(next);
    storage.set("loetogo.preferences", next);
  };

  return (
    <div className="min-h-screen bg-[#f7f8fa] text-slate-950">
      <header className="sticky top-0 z-30 border-b border-black/5 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
          <div>
            <div className="text-xl font-black tracking-tight">Loeto Go</div>
            <div className="text-xs text-slate-500">Botswana moves with you</div>
          </div>
          <select aria-label="Switch demo role" value={role}
            onChange={(e) => selectRole(e.target.value as UserRole)}
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium">
            <option value="client">Client</option>
            <option value="driver">Driver</option>
            <option value="restaurant">Restaurant</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl gap-6 px-4 pb-28 pt-6 md:grid-cols-[220px_1fr] md:px-8 md:pb-10">
        <aside className="hidden md:block">
          <div className="sticky top-24 space-y-2 rounded-3xl bg-white p-3 shadow-soft">
            {nav.map(({ label, icon: Icon }) => (
              <button key={label} onClick={() => setActive(label)}
                className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium ${active === label ? "bg-slate-950 text-white" : "hover:bg-slate-50"}`}>
                <Icon size={18} /> {label}
              </button>
            ))}
          </div>
        </aside>

        <section className="space-y-6">
          <div className="overflow-hidden rounded-[2rem] bg-slate-950 p-7 text-white md:p-10">
            <p className="mb-3 text-sm text-white/60">Viewing as {role}</p>
            <h1 className="max-w-2xl text-4xl font-black tracking-tight md:text-6xl">{current.title}</h1>
            <p className="mt-4 max-w-xl text-white/70">{current.subtitle}</p>
            <div className="mt-7 grid grid-cols-2 gap-3 md:grid-cols-4">
              {current.actions.map((action) => (
                <button key={action} className="rounded-2xl bg-white/10 px-4 py-4 text-left text-sm font-semibold backdrop-blur hover:bg-white/15">
                  {action}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <article className="rounded-[2rem] bg-white p-6 shadow-soft">
              <h2 className="text-xl font-bold">Dynamic onboarding</h2>
              <p className="mb-6 mt-1 text-sm text-slate-500">Tap common answers instead of typing everything.</p>
              <DynamicArrayField
                label="What matters most?"
                values={preferences}
                suggestions={["Fast delivery", "Low fees", "Cash payment", "Mobile money", "Eco delivery", "Scheduled orders"]}
                onChange={setPrefs}
              />
            </article>
            <article className="rounded-[2rem] bg-white p-6 shadow-soft">
              <h2 className="text-xl font-bold">Storage foundation</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                This phase writes to local browser storage. The UI already depends on a storage adapter so we can later swap in Google OAuth + Drive-backed persistence.
              </p>
              <div className="mt-5 rounded-2xl bg-slate-50 p-4 text-sm">
                <strong>Next adapter:</strong> GoogleDriveStorageAdapter
              </div>
            </article>
          </div>
        </section>
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-black/5 bg-white/95 px-2 pb-[max(env(safe-area-inset-bottom),8px)] pt-2 backdrop-blur md:hidden">
        <div className="mx-auto grid max-w-md grid-cols-4">
          {nav.map(({ label, icon: Icon }) => (
            <button key={label} onClick={() => setActive(label)}
              className={`flex flex-col items-center gap-1 rounded-2xl py-2 text-[11px] font-semibold ${active === label ? "text-slate-950" : "text-slate-400"}`}>
              <Icon size={22} strokeWidth={active === label ? 2.6 : 2} />
              {label}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
