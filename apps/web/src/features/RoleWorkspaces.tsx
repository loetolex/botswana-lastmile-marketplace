import { useMemo, useState } from "react";
import type {
  Address, CartLine, DeliveryOffer, MenuItem, Restaurant, RestaurantOrder
} from "@loetogo/domain";
import { DynamicArrayField } from "../components/DynamicArrayField";

const restaurants: Restaurant[] = [
  { id:"r1", name:"Mokolodi Kitchen", cuisines:["Setswana","Grill"], area:"Gaborone", etaMinutes:28, deliveryFee:{amount:18,currency:"BWP"}, rating:4.8, open:true },
  { id:"r2", name:"Urban Bowl", cuisines:["Healthy","Wraps"], area:"CBD", etaMinutes:24, deliveryFee:{amount:15,currency:"BWP"}, rating:4.6, open:true },
  { id:"r3", name:"Kgale Pizza Co.", cuisines:["Pizza","Fast food"], area:"Kgale", etaMinutes:35, deliveryFee:{amount:20,currency:"BWP"}, rating:4.7, open:true }
];

const menu: MenuItem[] = [
  { id:"m1", restaurantId:"r1", name:"Seswaa Bowl", description:"Slow-cooked beef, pap and morogo", category:"Mains", price:{amount:78,currency:"BWP"}, available:true },
  { id:"m2", restaurantId:"r1", name:"Grilled Chicken Plate", description:"Quarter chicken, chips and salad", category:"Mains", price:{amount:72,currency:"BWP"}, available:true },
  { id:"m3", restaurantId:"r2", name:"Chicken Avo Wrap", description:"Chicken, avo, greens and house sauce", category:"Wraps", price:{amount:64,currency:"BWP"}, available:true }
];

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
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [address, setAddress] = useState<Address>({label:"Home",area:"Gaborone",landmark:""});
  const [filters, setFilters] = useState<string[]>(["Fast delivery"]);

  const total = cart.reduce((sum, line) => sum + line.quantity * line.unitPrice.amount, 0);

  const addItem = (item: MenuItem) => {
    setCart(lines => {
      const existing = lines.find(line => line.itemId === item.id);
      if (existing) return lines.map(line => line.itemId === item.id ? {...line, quantity:line.quantity + 1} : line);
      return [...lines,{id:crypto.randomUUID(),itemId:item.id,name:item.name,quantity:1,unitPrice:item.price}];
    });
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

      <section>
        <div className="mb-4 flex items-end justify-between">
          <div><p className="text-sm text-slate-500">Nearby</p><h2 className="text-2xl font-black">Restaurants</h2></div>
          <button className="text-sm font-semibold">See all</button>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {restaurants.map(r=>(
            <button key={r.id} onClick={()=>setSelectedRestaurant(r)}
              className="overflow-hidden rounded-[1.75rem] bg-white text-left shadow-soft">
              <div className="aspect-[16/9] bg-gradient-to-br from-slate-200 to-slate-100 p-5">
                <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-bold">{r.etaMinutes} min</span>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-black">{r.name}</h3>
                <p className="mt-1 text-sm text-slate-500">{r.cuisines.join(" · ")}</p>
                <div className="mt-3 flex justify-between text-sm"><span>★ {r.rating}</span><span><Money amount={r.deliveryFee.amount}/> delivery</span></div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {selectedRestaurant && (
        <section className="rounded-[2rem] bg-white p-6 shadow-soft">
          <div className="flex items-start justify-between gap-4">
            <div><p className="text-sm text-slate-500">Menu</p><h2 className="text-2xl font-black">{selectedRestaurant.name}</h2></div>
            <button onClick={()=>setSelectedRestaurant(null)} className="rounded-full border px-4 py-2 text-sm">Close</button>
          </div>
          <div className="mt-5 divide-y">
            {menu.filter(item=>item.restaurantId===selectedRestaurant.id).map(item=>(
              <div key={item.id} className="flex items-center justify-between gap-4 py-4">
                <div><h3 className="font-bold">{item.name}</h3><p className="text-sm text-slate-500">{item.description}</p><p className="mt-2 font-bold"><Money amount={item.price.amount}/></p></div>
                <button onClick={()=>addItem(item)} className="rounded-full bg-slate-950 px-4 py-2 text-sm font-bold text-white">Add</button>
              </div>
            ))}
          </div>
        </section>
      )}

      {cart.length > 0 && (
        <section className="sticky bottom-24 rounded-[2rem] bg-slate-950 p-5 text-white md:bottom-6">
          <div className="flex items-center justify-between">
            <div><p className="text-xs text-white/60">{cart.reduce((s,l)=>s+l.quantity,0)} items</p><p className="text-xl font-black"><Money amount={total}/></p></div>
            <button className="rounded-full bg-white px-5 py-3 text-sm font-black text-slate-950">Review cart</button>
          </div>
        </section>
      )}
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
