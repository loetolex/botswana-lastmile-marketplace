type Props = {
  pickup?: string;
  dropoff?: string;
};

export function MapPlaceholder({pickup="Pickup location",dropoff="Delivery location"}:Props) {
  return (
    <section className="overflow-hidden rounded-[2rem] bg-white shadow-soft">
      <div className="relative min-h-[280px] bg-[radial-gradient(circle_at_20%_30%,#cbd5e1_0,transparent_22%),radial-gradient(circle_at_80%_70%,#dbeafe_0,transparent_24%),linear-gradient(135deg,#f8fafc,#e2e8f0)]">
        <div className="absolute left-[18%] top-[28%] rounded-full bg-slate-950 px-3 py-2 text-xs font-bold text-white">A</div>
        <div className="absolute bottom-[24%] right-[18%] rounded-full bg-emerald-600 px-3 py-2 text-xs font-bold text-white">B</div>
        <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-white/90 p-4 backdrop-blur">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-500">MapLibre-ready route shell</p>
          <p className="mt-1 text-sm font-semibold">{pickup} → {dropoff}</p>
        </div>
      </div>
    </section>
  );
}
