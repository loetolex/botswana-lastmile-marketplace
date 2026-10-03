import { useEffect, useMemo, useState } from "react";
import type { Address, CartLine, DeliveryOffer, RestaurantOrder } from "@loetogo/domain";
import { DynamicArrayField } from "../components/DynamicArrayField";
import { CheckoutPanel } from "./CheckoutPanel";
import { MapPlaceholder } from "./MapPlaceholder";
import { LocalRepository } from "../lib/localRepository";
import { storage } from "../lib/storage";
import { pilotRestaurants, type PilotMenuItem, type PilotRestaurant } from "../data/pilotRestaurants";

const offers: DeliveryOffer[] = [
  { id:"o1", restaurant:"Zen Cafe Lounge", pickupArea:"CBD", dropoffArea:"Block 8", estimatedKm:6.4, estimatedMinutes:23, earnings:{amount:42,currency:"BWP"} },
  { id:"o2", restaurant:"The Daily Grind", pickupArea:"Independence Avenue", dropoffArea:"Village", estimatedKm:4.1, estimatedMinutes:18, earnings:{amount:34,currency:"BWP"} }
];

const seedOrders: RestaurantOrder[] = [
  { id:"LG-1042", customerName:"Naledi", items:[{name:"Seswaa Taco",quantity:2}], total:{amount:440,currency:"BWP"}, status:"placed", promisedMinutes:24 },
  { id:"LG-1041", customerName:"Kabelo", items:[{name:"Classic Burger",quantity:1}], total:{amount:140,currency:"BWP"}, status:"preparing", promisedMinutes:12 }
];

function Money({ amount }: { amount:number }) {
  return <span>P{amount.toFixed(2)}</span>;
}

function RestaurantCard({restaurant,onOpen}:{restaurant:PilotRestaurant;onOpen:()=>void}) {
  return (
    <button onClick={onOpen} className="group overflow-hidden rounded-[1.75rem] bg-white text-left shadow-soft transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img src={restaurant.image} alt="" loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105"/>
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent"/>
        <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-black text-slate-900">{restaurant.etaMinutes} min</div>
        <div className="absolute inset-x-4 bottom-4">
          <div className="mb-2 inline-flex h-11 w-11 items-center justify-center rounded-2xl text-sm font-black text-white"
            style={{background:`linear-gradient(135deg,${restaurant.brand[0]},${restaurant.brand[1]})`}}>
            {restaurant.name.split(" ").slice(0,2).map(x=>x[0]).join("").toUpperCase()}
          </div>
          <h3 className="text-xl font-black text-white">{restaurant.name}</h3>
        </div>
      </div>
      <div className="p-5">
        <p className="text-sm text-slate-500">{restaurant.cuisines.join(" · ")} · {restaurant.area}</p>
        <div className="mt-3 flex items-center justify-between text-sm">
          <span className="font-bold text-amber-600">{typeof restaurant.rating==="number" ? `★ ${restaurant.rating}` : "New · unrated"}</span>
          <span className="font-semibold text-slate-700">P{restaurant.deliveryFee} delivery</span>
        </div>
      </div>
    </button>
  );
}

function Storefront({restaurant,onBack,onAdd}:{restaurant:PilotRestaurant;onBack:()=>void;onAdd:(item:PilotMenuItem)=>void}) {
  const categories = Array.from(new Set(restaurant.menu.map(item=>item.category)));
  const [category,setCategory] = useState(categories[0] ?? "All");
  const [query,setQuery] = useState("");
  const filtered = restaurant.menu.filter(item => {
    const inCategory = category==="All" || item.category===category;
    const q=query.trim().toLowerCase();
    return inCategory && (!q || item.name.toLowerCase().includes(q) || item.description?.toLowerCase().includes(q));
  });

  return (
    <div className="space-y-5">
      <section className="overflow-hidden rounded-[2rem] bg-white shadow-soft">
        <div className="relative min-h-[300px] overflow-hidden p-6 text-white"
          style={{background:`linear-gradient(135deg,${restaurant.brand[0]}d9,${restaurant.brand[1]}e8), url("${restaurant.image}") center/cover`}}>
          <button onClick={onBack} className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-2 text-sm font-black text-slate-900">← Back</button>
          <div className="absolute bottom-6 left-6 right-6">
            <p className="text-xs font-black uppercase tracking-[.18em] text-white/70">{restaurant.sourceLabel}</p>
            <h2 className="mt-2 text-4xl font-black md:text-5xl">{restaurant.name}</h2>
            <p className="mt-2 text-white/80">{restaurant.openLabel} · {restaurant.area}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {restaurant.cuisines.map(x=><span key={x} className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold backdrop-blur">{x}</span>)}
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search this menu"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 md:max-w-sm"/>
            <a href={restaurant.sourceUrl} target="_blank" rel="noreferrer" className="text-sm font-black text-blue-600">View public source ↗</a>
          </div>

          <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
            {["All",...categories].map(x=>(
              <button key={x} onClick={()=>setCategory(x)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold ${category===x?"bg-blue-600 text-white":"bg-slate-100 text-slate-700"}`}>
                {x}
              </button>
            ))}
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {filtered.map(item=>(
              <article key={item.id} className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-black uppercase tracking-wide text-slate-400">{item.category}</p>
                    <h3 className="mt-1 text-lg font-black">{item.name}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-500">{item.description}</p>
                    {item.dietary?.length ? <div className="mt-3 flex gap-2">{item.dietary.map(d=><span key={d} className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-black text-emerald-700">{d}</span>)}</div> : null}
                  </div>
                  <div className="text-right">
                    {typeof item.price==="number" ? <p className="font-black">P{item.price}</p> : <p className="text-xs font-bold text-slate-400">Price at source</p>}
                  </div>
                </div>
                <button disabled={typeof item.price!=="number"} onClick={()=>onAdd(item)}
                  className="mt-4 w-full rounded-full bg-blue-600 px-4 py-3 text-sm font-black text-white disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500">
                  {typeof item.price==="number" ? "Add to cart" : "Browse only"}
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export function ClientWorkspace({tab}:{tab:string}) {
  const repository = useMemo(()=>new LocalRepository(storage),[]);
  const [selectedRestaurant,setSelectedRestaurant] = useState<PilotRestaurant|null>(null);
  const [search,setSearch] = useState("");
  const [cart,setCart] = useState<CartLine[]>([]);
  const [orders,setOrders] = useState<RestaurantOrder[]>([]);
  const [address,setAddress] = useState<Address>({label:"Home",area:"Gaborone",landmark:""});
  const [filters,setFilters] = useState<string[]>(["Fast delivery"]);
  const [checkoutOpen,setCheckoutOpen] = useState(false);
  const [lastOrder,setLastOrder] = useState<string|null>(null);

  useEffect(()=>{ repository.getCart().then(setCart); repository.getOrders().then(setOrders); },[repository]);

  const total=cart.reduce((s,l)=>s+l.quantity*l.unitPrice.amount,0);
  const results=pilotRestaurants.filter(r=>{
    const q=search.trim().toLowerCase();
    return !q || r.name.toLowerCase().includes(q) || r.area.toLowerCase().includes(q) || r.cuisines.some(c=>c.toLowerCase().includes(q)) || r.menu.some(m=>m.name.toLowerCase().includes(q));
  });

  const addMenuItem=(item:PilotMenuItem)=>{
    if(typeof item.price!=="number" || !selectedRestaurant) return;
    setCart(lines=>{
      const existing=lines.find(line=>line.itemId===item.id);
      const next=existing ? lines.map(line=>line.itemId===item.id?{...line,quantity:line.quantity+1}:line)
        : [...lines,{id:crypto.randomUUID(),itemId:item.id,name:item.name,quantity:1,unitPrice:{amount:item.price!,currency:"BWP" as const}}];
      repository.saveCart(next); return next;
    });
  };

  const placeOrder=async(method:"cash"|"mobile_money"|"card")=>{
    const id=`LG-${Math.floor(1000+Math.random()*9000)}`;
    const deliveryFee=selectedRestaurant?.deliveryFee??18;
    const order:RestaurantOrder={id,customerName:"Local test customer",items:cart.map(l=>({name:l.name,quantity:l.quantity})),total:{amount:total+deliveryFee,currency:"BWP"},status:"placed",promisedMinutes:selectedRestaurant?.etaMinutes??30};
    await repository.saveCheckoutDraft({id,restaurantId:selectedRestaurant?.id??"mixed",addressLabel:`${address.label} · ${address.area}`,paymentMethod:method,lines:cart,subtotal:total,deliveryFee,total:total+deliveryFee});
    await repository.addOrder(order); await repository.saveCart([]);
    setOrders(prev=>[order,...prev]); setCart([]); setCheckoutOpen(false); setLastOrder(id);
  };

  if(tab==="Search"){
    return <div className="space-y-6">
      <section className="rounded-[2rem] bg-gradient-to-br from-sky-500 to-violet-600 p-6 text-white">
        <p className="text-sm font-bold text-white/70">Search Loeto Go</p>
        <h2 className="mt-2 text-3xl font-black">Find a restaurant or dish</h2>
        <input autoFocus value={search} onChange={e=>setSearch(e.target.value)} placeholder="Try sushi, burger, breakfast..."
          className="mt-5 w-full rounded-2xl bg-white px-5 py-4 text-base text-slate-900 outline-none"/>
      </section>
      {selectedRestaurant ? <Storefront restaurant={selectedRestaurant} onBack={()=>setSelectedRestaurant(null)} onAdd={addMenuItem}/> :
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{results.map(r=><RestaurantCard key={r.id} restaurant={r} onOpen={()=>setSelectedRestaurant(r)}/>)}</div>}
    </div>;
  }

  if(tab==="Orders"){
    return <div className="space-y-5">
      <div><p className="text-sm text-slate-500">Your activity</p><h2 className="text-3xl font-black">Orders</h2></div>
      {orders.length===0 ? <div className="rounded-[2rem] bg-white p-8 text-center shadow-soft"><p className="text-xl font-black">No orders yet</p><p className="mt-2 text-sm text-slate-500">Your local test orders will appear here.</p></div> :
      orders.map(o=><article key={o.id} className="rounded-[2rem] bg-white p-6 shadow-soft">
        <div className="flex justify-between gap-4"><div><p className="text-sm text-slate-500">{o.id}</p><h3 className="mt-1 text-lg font-black">{o.items.map(i=>`${i.quantity}× ${i.name}`).join(", ")}</h3></div><span className="h-fit rounded-full bg-blue-100 px-3 py-1 text-xs font-black capitalize text-blue-700">{o.status.replace("_"," ")}</span></div>
        <div className="mt-4 flex justify-between text-sm"><span>ETA {o.promisedMinutes} min</span><span className="font-black"><Money amount={o.total.amount}/></span></div>
      </article>)}
    </div>;
  }

  if(tab==="Profile"){
    return <div className="grid gap-6 lg:grid-cols-2">
      <section className="rounded-[2rem] bg-white p-6 shadow-soft">
        <p className="text-sm text-slate-500">Account</p><h2 className="mt-1 text-3xl font-black">Your Loeto Go</h2>
        <div className="mt-6 space-y-3">
          <div className="rounded-2xl bg-slate-50 p-4"><p className="text-xs font-bold text-slate-400">NAME</p><p className="mt-1 font-black">Local test customer</p></div>
          <div className="rounded-2xl bg-slate-50 p-4"><p className="text-xs font-bold text-slate-400">STORAGE</p><p className="mt-1 font-black">Local state · Google Drive later</p></div>
        </div>
      </section>
      <section className="rounded-[2rem] bg-white p-6 shadow-soft">
        <h3 className="text-xl font-black">Saved delivery address</h3>
        <div className="mt-4 grid gap-3">
          <input value={address.area} onChange={e=>setAddress({...address,area:e.target.value})} className="rounded-2xl border border-slate-200 px-4 py-3" placeholder="Area"/>
          <input value={address.landmark??""} onChange={e=>setAddress({...address,landmark:e.target.value})} className="rounded-2xl border border-slate-200 px-4 py-3" placeholder="Landmark"/>
        </div>
      </section>
    </div>;
  }

  return <div className="space-y-6">
    {selectedRestaurant ? <Storefront restaurant={selectedRestaurant} onBack={()=>setSelectedRestaurant(null)} onAdd={addMenuItem}/> : <>
      <section className="rounded-[2rem] bg-white p-6 shadow-soft">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div><p className="text-sm font-semibold text-slate-500">Deliver to</p><h2 className="text-2xl font-black">{address.label} · {address.area}</h2><p className="mt-1 text-sm text-slate-500">{address.landmark||"Add a landmark for easier delivery"}</p></div>
          <div className="max-w-xl"><DynamicArrayField label="Quick filters" values={filters} suggestions={["Fast delivery","Under P20 fee","Top rated","Breakfast","Sushi","Chicken"]} onChange={setFilters}/></div>
        </div>
      </section>
      <section className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-cyan-400 via-blue-600 to-violet-600 p-6 text-white shadow-soft">
        <p className="text-sm font-bold text-white/70">Interactive pilot</p><h2 className="mt-2 text-3xl font-black">5 restaurants we can actually explore</h2><p className="mt-2 max-w-2xl text-sm text-white/80">Tap a restaurant, browse menu categories, search dishes, add priced items to cart, and place a local test order.</p>
      </section>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{pilotRestaurants.map(r=><RestaurantCard key={r.id} restaurant={r} onOpen={()=>setSelectedRestaurant(r)}/>)}</div>
    </>}

    {cart.length>0 && <section className="sticky bottom-24 rounded-[2rem] bg-gradient-to-r from-blue-600 to-violet-600 p-5 text-white md:bottom-6">
      <div className="flex items-center justify-between"><div><p className="text-xs text-white/70">{cart.reduce((s,l)=>s+l.quantity,0)} items</p><p className="text-xl font-black"><Money amount={total}/></p></div><button onClick={()=>setCheckoutOpen(true)} className="rounded-full bg-white px-5 py-3 text-sm font-black text-blue-700">Review cart</button></div>
    </section>}
    {checkoutOpen&&cart.length>0&&<CheckoutPanel lines={cart} deliveryFee={selectedRestaurant?.deliveryFee??18} onPlaceOrder={placeOrder}/>}
    {lastOrder&&<section className="rounded-[2rem] bg-emerald-50 p-6"><p className="text-xs font-black uppercase text-emerald-700">Order placed locally</p><h3 className="mt-2 text-2xl font-black">{lastOrder}</h3></section>}
    <MapPlaceholder pickup={selectedRestaurant?.name??"Restaurant"} dropoff={`${address.label}, ${address.area}`}/>
  </div>;
}

export function DriverWorkspace() {
  const [online,setOnline]=useState(false);
  const [activeOffer,setActiveOffer]=useState<DeliveryOffer|null>(null);
  const [vehicleTypes,setVehicleTypes]=useState<string[]>(["Car"]);
  return <div className="grid gap-6 lg:grid-cols-[1.4fr_.6fr]">
    <section className="space-y-4">
      <div className="rounded-[2rem] bg-white p-6 shadow-soft"><div className="flex items-center justify-between"><div><p className="text-sm text-slate-500">Driver status</p><h2 className="text-2xl font-black">{online?"You're online":"You're offline"}</h2></div><button onClick={()=>setOnline(v=>!v)} className="rounded-full bg-blue-600 px-5 py-3 text-sm font-black text-white">{online?"Go offline":"Go online"}</button></div></div>
      {offers.map(o=><article key={o.id} className="rounded-[2rem] bg-white p-6 shadow-soft"><div className="flex justify-between gap-4"><div><p className="text-sm text-slate-500">{o.restaurant}</p><h3 className="mt-1 text-xl font-black">{o.pickupArea} → {o.dropoffArea}</h3><p className="mt-2 text-sm text-slate-500">{o.estimatedKm} km · ~{o.estimatedMinutes} min</p></div><div className="text-right"><p className="text-xs text-slate-500">You earn</p><p className="text-2xl font-black"><Money amount={o.earnings.amount}/></p></div></div><button onClick={()=>setActiveOffer(o)} className="mt-5 w-full rounded-full bg-blue-600 px-4 py-3 font-black text-white">Accept</button></article>)}
    </section>
    <aside className="space-y-4"><div className="rounded-[2rem] bg-white p-6 shadow-soft"><DynamicArrayField label="Vehicle types" values={vehicleTypes} suggestions={["Bicycle","Motorbike","Car","Bakkie","Van"]} onChange={setVehicleTypes}/></div>{activeOffer&&<MapPlaceholder pickup={activeOffer.pickupArea} dropoff={activeOffer.dropoffArea}/>}</aside>
  </div>;
}

export function RestaurantWorkspace() {
  const [orders,setOrders]=useState(seedOrders);
  const [cuisines,setCuisines]=useState<string[]>(["Modern","Grill"]);
  const updateStatus=(id:string,status:RestaurantOrder["status"])=>setOrders(items=>items.map(o=>o.id===id?{...o,status}:o));
  return <div className="grid gap-6 lg:grid-cols-[1.3fr_.7fr]">
    <section className="space-y-4"><div><p className="text-sm text-slate-500">Kitchen queue</p><h2 className="text-2xl font-black">Live orders</h2></div>{orders.map(o=><article key={o.id} className="rounded-[2rem] bg-white p-6 shadow-soft"><div className="flex justify-between gap-4"><div><p className="text-sm text-slate-500">{o.id} · {o.customerName}</p><h3 className="mt-1 font-black">{o.items.map(i=>`${i.quantity}× ${i.name}`).join(", ")}</h3></div><span className="h-fit rounded-full bg-blue-100 px-3 py-1 text-xs font-black text-blue-700">{o.status}</span></div><div className="mt-4 flex gap-2">{(["accepted","preparing","ready"] as RestaurantOrder["status"][]).map(s=><button key={s} onClick={()=>updateStatus(o.id,s)} className="rounded-full border px-4 py-2 text-sm font-bold capitalize">{s}</button>)}</div></article>)}</section>
    <aside><div className="rounded-[2rem] bg-white p-6 shadow-soft"><DynamicArrayField label="Cuisines" values={cuisines} suggestions={["Setswana","Grill","Pizza","Chicken","Sushi","Breakfast","Cafe"]} onChange={setCuisines}/></div></aside>
  </div>;
}

export function AdminWorkspace() {
  const [statusFilter,setStatusFilter]=useState<string[]>(["Active"]);
  return <div className="space-y-6">
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">{[["Live orders","18"],["Drivers online","31"],["Pilot restaurants","5"],["Issues","3"]].map(([l,v])=><div key={l} className="rounded-[1.75rem] bg-white p-5 shadow-soft"><p className="text-sm text-slate-500">{l}</p><p className="mt-2 text-3xl font-black">{v}</p></div>)}</div>
    <div className="rounded-[2rem] bg-white p-6 shadow-soft"><DynamicArrayField label="Moderation view" values={statusFilter} suggestions={["Active","Needs review","Suspended","Cash orders"]} onChange={setStatusFilter}/></div>
  </div>;
}
