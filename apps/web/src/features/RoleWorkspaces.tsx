import { useEffect, useMemo, useState } from "react";
import type {
  Address, CartLine, DeliveryOffer, RestaurantOrder
} from "@loetogo/domain";
import { DynamicArrayField } from "../components/DynamicArrayField";
import { CheckoutPanel } from "./CheckoutPanel";
import { MapPlaceholder } from "./MapPlaceholder";
import { LocalRepository } from "../lib/localRepository";
import { storage } from "../lib/storage";
import { gaboroneStorefronts, type DemoMenuItem, type DemoStorefront } from "../data/gaboroneRestaurants";

const offers: DeliveryOffer[] = [
  { id:"o1", restaurant:"Mokolodi Kitchen", pickupArea:"Main Mall", dropoffArea:"Block 8", estimatedKm:6.4, estimatedMinutes:23, earnings:{amount:42,currency:"BWP"} },
  { id:"o2", restaurant:"Urban Bowl", pickupArea:"CBD", dropoffArea:"Village", estimatedKm:4.1, estimatedMinutes:18, earnings:{amount:34,currency:"BWP"} }
];

const seedOrders: RestaurantOrder[] = [
  { id:"LG-1042", customerName:"Naledi", items:[{name:"Seswaa Bowl",quantity:2},{name:"Coke",quantity:1}], total:{amount:176,currency:"BWP"}, status:"placed", promisedMinutes:24 },
  { id:"LG-1041", customerName:"Kabelo", items:[{name:"Grilled Chicken Plate",quantity:1}], total:{amount:90,currency:"BWP"}, status:"preparing", promisedMinutes:12 }
];

function Money({ amount }: { amount:number }) {
  return <span>P{amount.toFixed(2)}</span>;
}

export function ClientWorkspace() {
  const repository = useMemo(()=>new LocalRepository(storage),[]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<DemoStorefront | null>(null);
  const [search,setSearch] = useState("");
  const [cart, setCart] = useState<CartLine[]>([]);
  const [address, setAddress] = useState<Address>({label:"Home",area:"Gaborone",landmark:""});
  const [filters, setFilters] = useState<string[]>(["Fast delivery"]);
  const [checkoutOpen,setCheckoutOpen] = useState(false);
  const [lastOrder,setLastOrder] = useState<string | null>(null);

  useEffect(()=>{ repository.getCart().then(setCart); },[repository]);

  const total = cart.reduce((sum, line) => sum + line.quantity * line.unitPrice.amount, 0);

  const visibleStorefronts = useMemo(()=>{
    const q=search.trim().toLowerCase();
    if(!q) return gaboroneStorefronts;
    return gaboroneStorefronts.filter(store =>
      store.name.toLowerCase().includes(q) ||
      store.area.toLowerCase().includes(q) ||
      store.cuisines.some(cuisine=>cuisine.toLowerCase().includes(q))
    );
  },[search]);

  const addMenuItem = (item: DemoMenuItem, index:number) => {
    if(typeof item.price !== "number" || !selectedRestaurant) return;
    const itemId=`${selectedRestaurant.id}-${index}`;
    setCart(lines => {
      const existing = lines.find(line => line.itemId === itemId);
      const next = existing
        ? lines.map(line => line.itemId === itemId ? {...line, quantity:line.quantity + 1} : line)
        : [...lines,{id:crypto.randomUUID(),itemId,name:item.name,quantity:1,unitPrice:{amount:item.price!,currency:"BWP" as const}}];
      repository.saveCart(next);
      return next;
    });
  };

  const placeOrder = async (paymentMethod:"cash"|"mobile_money"|"card") => {
    const id = `LG-${Math.floor(1000 + Math.random()*9000)}`;
    const deliveryFee = selectedRestaurant?.deliveryFee ?? 18;
    await repository.saveCheckoutDraft({
      id,
      restaurantId:selectedRestaurant?.id ?? "mixed",
      addressLabel:`${address.label} · ${address.area}`,
      paymentMethod,
      lines:cart,
      subtotal:total,
      deliveryFee,
      total:total+deliveryFee
    });
    await repository.addOrder({
      id,
      customerName:"Local test customer",
      items:cart.map(line=>({name:line.name,quantity:line.quantity})),
      total:{amount:total+deliveryFee,currency:"BWP"},
      status:"placed",
      promisedMinutes:selectedRestaurant?.etaMinutes ?? 30
    });
    await repository.saveCart([]);
    setCart([]);
    setCheckoutOpen(false);
    setLastOrder(id);
  };

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] bg-white p-6 shadow-soft">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-500">Deliver to</p>
            <h2 className="text-2xl font-black">{address.label} · {address.area}</h2>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            <input className="rounded-2xl border border-slate-200 px-4 py-3" value={address.area}
              onChange={e=>setAddress({...address,area:e.target.value})} placeholder="Area" />
            <input className="rounded-2xl border border-slate-200 px-4 py-3" value={address.landmark ?? ""}
              onChange={e=>setAddress({...address,landmark:e.target.value})} placeholder="Landmark" />
          </div>
        </div>
        <div className="mt-5">
          <DynamicArrayField label="Quick filters" values={filters}
            suggestions={["Fast delivery","Under P20 fee","Top rated","Open now","Local food","Healthy"]}
            onChange={setFilters} />
        </div>
      </section>

      <section className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-sky-500 via-blue-600 to-violet-600 p-6 text-white shadow-soft">
        <p className="text-sm font-bold text-white/70">Gaborone food discovery</p>
        <div className="mt-2 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-black">50 storefronts. One city.</h2>
            <p className="mt-2 max-w-xl text-sm text-white/80">Proof-of-concept catalogue built from current public restaurant listings and public menus. Demo listings are not merchant partnerships yet.</p>
          </div>
          <input value={search} onChange={e=>setSearch(e.target.value)}
            placeholder="Search restaurant or cuisine"
            className="w-full rounded-2xl border border-white/20 bg-white/15 px-4 py-3 text-white placeholder:text-white/60 outline-none backdrop-blur md:max-w-sm" />
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between">
          <div><p className="text-sm text-slate-500">Gaborone catalogue</p><h2 className="text-2xl font-black">{visibleStorefronts.length} restaurants</h2></div>
          <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-black text-sky-700">DEMO STOREFRONTS</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {visibleStorefronts.map(r=>(
            <button key={r.id} onClick={()=>setSelectedRestaurant(r)}
              className="group overflow-hidden rounded-[1.75rem] bg-white text-left shadow-soft transition hover:-translate-y-1 hover:shadow-xl">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img src={r.image} alt="" loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105"/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"/>
                <div className="absolute left-4 top-4 flex gap-2">
                  <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-black text-slate-900">{r.etaMinutes} min</span>
                  {r.menu?.length ? <span className="rounded-full bg-emerald-400 px-3 py-1 text-xs font-black text-emerald-950">MENU</span> : null}
                </div>
                <div className="absolute inset-x-4 bottom-4">
                  <div className="mb-2 inline-flex h-11 w-11 items-center justify-center rounded-2xl text-lg font-black text-white shadow-lg"
                    style={{background:`linear-gradient(135deg,${r.brand[0]},${r.brand[1]})`}}>
                    {r.name.split(" ").slice(0,2).map(x=>x[0]).join("").toUpperCase()}
                  </div>
                  <h3 className="text-xl font-black text-white">{r.name}</h3>
                </div>
              </div>
              <div className="p-5">
                <p className="text-sm text-slate-500">{r.cuisines.join(" · ")} · {r.area}</p>
                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="font-bold text-amber-600">{typeof r.rating==="number" ? <>★ {r.rating}{r.reviews ? ` (${r.reviews})` : ""}</> : "New · unrated"}</span>
                  <span className="font-semibold text-slate-700">P{r.deliveryFee} delivery</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {selectedRestaurant && (
        <section className="overflow-hidden rounded-[2rem] bg-white shadow-soft">
          <div className="relative min-h-[260px] overflow-hidden p-6 text-white"
            style={{background:`linear-gradient(135deg,${selectedRestaurant.brand[0]}e6,${selectedRestaurant.brand[1]}e6), url("${selectedRestaurant.image}") center/cover`}}>
            <button onClick={()=>setSelectedRestaurant(null)} className="absolute right-5 top-5 rounded-full bg-white/90 px-4 py-2 text-sm font-bold text-slate-900">Close</button>
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-xs font-black uppercase tracking-[.18em] text-white/70">Demo storefront · {selectedRestaurant.sourceLabel}</p>
              <h2 className="mt-2 text-4xl font-black">{selectedRestaurant.name}</h2>
              <p className="mt-2 text-white/80">{selectedRestaurant.cuisines.join(" · ")} · {selectedRestaurant.area}</p>
            </div>
          </div>
          <div className="p-6">
            {selectedRestaurant.menu?.length ? (
              <>
                <div className="mb-4 flex items-center justify-between"><h3 className="text-xl font-black">Public menu preview</h3><a href={selectedRestaurant.sourceUrl} target="_blank" rel="noreferrer" className="text-sm font-bold text-blue-600">Source ↗</a></div>
                <div className="divide-y">
                  {selectedRestaurant.menu.map((item,index)=>(
                    <div key={item.name} className="flex items-center justify-between gap-4 py-4">
                      <div><h4 className="font-bold">{item.name}</h4><p className="mt-1 text-xs text-slate-500">{item.note}</p>{typeof item.price==="number" && <p className="mt-2 font-black">P{item.price.toFixed(2)}</p>}</div>
                      {typeof item.price==="number"
                        ? <button onClick={()=>addMenuItem(item,index)} className="rounded-full bg-blue-600 px-4 py-2 text-sm font-black text-white">Add</button>
                        : <span className="rounded-full bg-amber-100 px-3 py-2 text-xs font-black text-amber-800">Preview</span>}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="font-black">Storefront ready · menu import pending</p>
                <p className="mt-1 text-sm text-slate-500">The restaurant is present as a discovery proof of concept. We will only enable ordering after a menu is sourced or the merchant claims the storefront.</p>
                <a href={selectedRestaurant.sourceUrl} target="_blank" rel="noreferrer" className="mt-4 inline-block text-sm font-bold text-blue-600">View public listing ↗</a>
              </div>
            )}
          </div>
        </section>
      )}

      {cart.length > 0 && (
        <section className="sticky bottom-24 rounded-[2rem] bg-slate-950 p-5 text-white md:bottom-6">
          <div className="flex items-center justify-between">
            <div><p className="text-xs text-white/60">{cart.reduce((s,l)=>s+l.quantity,0)} items</p><p className="text-xl font-black"><Money amount={total}/></p></div>
            <button onClick={()=>setCheckoutOpen(true)} className="rounded-full bg-white px-5 py-3 text-sm font-black text-slate-950">Review cart</button>
          </div>
        </section>
      )}

      {checkoutOpen && cart.length > 0 && (
        <CheckoutPanel lines={cart} deliveryFee={selectedRestaurant?.deliveryFee ?? 18} onPlaceOrder={placeOrder}/>
      )}

      {lastOrder && (
        <section className="rounded-[2rem] bg-emerald-50 p-6">
          <p className="text-xs font-black uppercase tracking-wide text-emerald-700">Order placed locally</p>
          <h3 className="mt-2 text-2xl font-black">{lastOrder}</h3>
          <p className="mt-1 text-sm text-slate-600">Saved through LocalRepository. Google Drive will later implement the same persistence boundary.</p>
        </section>
      )}

      <MapPlaceholder pickup={selectedRestaurant?.name ?? "Restaurant"} dropoff={`${address.label}, ${address.area}`} />
    </div>
  );
}

export function DriverWorkspace() {
  const [online, setOnline] = useState(false);
  const [activeOffer, setActiveOffer] = useState<DeliveryOffer | null>(null);
  const [vehicleTypes, setVehicleTypes] = useState<string[]>(["Car"]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.4fr_.6fr]">
      <section className="space-y-4">
        <div className="rounded-[2rem] bg-white p-6 shadow-soft">
          <div className="flex items-center justify-between">
            <div><p className="text-sm text-slate-500">Driver status</p><h2 className="text-2xl font-black">{online ? "You're online" : "You're offline"}</h2></div>
            <button onClick={()=>setOnline(v=>!v)} className={`rounded-full px-5 py-3 text-sm font-black ${online?"bg-emerald-600 text-white":"bg-slate-950 text-white"}`}>
              {online ? "Go offline" : "Go online"}
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {offers.map(offer=>(
            <article key={offer.id} className="rounded-[2rem] bg-white p-6 shadow-soft">
              <div className="flex justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-500">{offer.restaurant}</p>
                  <h3 className="mt-1 text-xl font-black">{offer.pickupArea} → {offer.dropoffArea}</h3>
                  <p className="mt-2 text-sm text-slate-500">{offer.estimatedKm} km · ~{offer.estimatedMinutes} min</p>
                </div>
                <div className="text-right"><p className="text-xs text-slate-500">You earn</p><p className="text-2xl font-black"><Money amount={offer.earnings.amount}/></p></div>
              </div>
              <div className="mt-5 flex gap-3">
                <button className="flex-1 rounded-full border px-4 py-3 font-bold">Decline</button>
                <button onClick={()=>setActiveOffer(offer)} className="flex-1 rounded-full bg-slate-950 px-4 py-3 font-bold text-white">Accept</button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <aside className="space-y-4">
        <div className="rounded-[2rem] bg-white p-6 shadow-soft">
          <h3 className="text-lg font-black">Vehicle setup</h3>
          <div className="mt-4"><DynamicArrayField label="Vehicle types" values={vehicleTypes} suggestions={["Bicycle","Motorbike","Car","Bakkie","Van"]} onChange={setVehicleTypes}/></div>
        </div>
        <div className="rounded-[2rem] bg-slate-950 p-6 text-white">
          <p className="text-sm text-white/60">Today</p><p className="mt-2 text-3xl font-black">P287.00</p>
          <p className="mt-1 text-sm text-white/60">6 completed deliveries</p>
        </div>
        {activeOffer && <div className="rounded-[2rem] bg-emerald-50 p-6"><p className="text-xs font-bold uppercase text-emerald-700">Active delivery</p><h3 className="mt-2 font-black">{activeOffer.pickupArea} → {activeOffer.dropoffArea}</h3></div>}
        {activeOffer && <MapPlaceholder pickup={activeOffer.pickupArea} dropoff={activeOffer.dropoffArea}/>}
      </aside>
    </div>
  );
}

export function RestaurantWorkspace() {
  const [orders,setOrders] = useState(seedOrders);
  const [cuisines,setCuisines] = useState<string[]>(["Setswana","Grill"]);
  const [categories,setCategories] = useState<string[]>(["Mains","Drinks"]);
  const updateStatus = (id:string,status:RestaurantOrder["status"]) => setOrders(items=>items.map(o=>o.id===id?{...o,status}:o));

  return (
    <div className="grid gap-6 lg:grid-cols-[1.3fr_.7fr]">
      <section className="space-y-4">
        <div><p className="text-sm text-slate-500">Kitchen queue</p><h2 className="text-2xl font-black">Live orders</h2></div>
        {orders.map(order=>(
          <article key={order.id} className="rounded-[2rem] bg-white p-6 shadow-soft">
            <div className="flex items-start justify-between gap-4">
              <div><p className="text-sm text-slate-500">{order.id} · {order.customerName}</p><h3 className="mt-1 text-xl font-black">{order.items.map(i=>`${i.quantity}× ${i.name}`).join(", ")}</h3></div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold capitalize">{order.status.replace("_"," ")}</span>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {(["accepted","preparing","ready"] as RestaurantOrder["status"][]).map(status=>(
                <button key={status} onClick={()=>updateStatus(order.id,status)} className="rounded-full border px-4 py-2 text-sm font-bold capitalize">{status}</button>
              ))}
            </div>
          </article>
        ))}
      </section>
      <aside className="space-y-4">
        <div className="rounded-[2rem] bg-white p-6 shadow-soft">
          <h3 className="text-lg font-black">Store profile</h3>
          <div className="mt-5"><DynamicArrayField label="Cuisines" values={cuisines} suggestions={["Setswana","Grill","Pizza","Chicken","Burgers","Healthy","Bakery"]} onChange={setCuisines}/></div>
          <div className="mt-6"><DynamicArrayField label="Menu categories" values={categories} suggestions={["Breakfast","Mains","Sides","Drinks","Dessert","Combos"]} onChange={setCategories}/></div>
        </div>
      </aside>
    </div>
  );
}

export function AdminWorkspace() {
  const [statusFilter,setStatusFilter] = useState<string[]>(["Active"]);
  const stats = useMemo(()=>[
    ["Live orders","18"],["Drivers online","31"],["Restaurants open","44"],["Issues","3"]
  ],[]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map(([label,value])=>(
          <div key={label} className="rounded-[1.75rem] bg-white p-5 shadow-soft"><p className="text-sm text-slate-500">{label}</p><p className="mt-2 text-3xl font-black">{value}</p></div>
        ))}
      </div>
      <div className="rounded-[2rem] bg-white p-6 shadow-soft">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div><p className="text-sm text-slate-500">Operations</p><h2 className="text-2xl font-black">Marketplace moderation</h2></div>
          <div className="max-w-xl"><DynamicArrayField label="View" values={statusFilter} suggestions={["Active","Needs review","Suspended","High value","Cash orders"]} onChange={setStatusFilter}/></div>
        </div>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead className="border-b text-slate-500"><tr><th className="py-3">Order</th><th>Restaurant</th><th>Route</th><th>Status</th><th>Value</th></tr></thead>
            <tbody>
              <tr className="border-b"><td className="py-4 font-bold">LG-1042</td><td>Mokolodi Kitchen</td><td>Main Mall → Block 8</td><td>Preparing</td><td>P176</td></tr>
              <tr className="border-b"><td className="py-4 font-bold">LG-1043</td><td>Urban Bowl</td><td>CBD → Village</td><td>Assigned</td><td>P118</td></tr>
              <tr><td className="py-4 font-bold">LG-1044</td><td>Kgale Pizza Co.</td><td>Kgale → Broadhurst</td><td>Placed</td><td>P242</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
