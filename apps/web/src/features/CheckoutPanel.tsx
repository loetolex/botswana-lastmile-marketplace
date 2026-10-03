import { useMemo, useState } from "react";
import type { CartLine } from "@loetogo/domain";
import { Button } from "../components/ui/button";

type Props = {
  lines: CartLine[];
  deliveryFee: number;
  onPlaceOrder: (method: "cash" | "mobile_money" | "card") => void;
};

export function CheckoutPanel({ lines, deliveryFee, onPlaceOrder }: Props) {
  const [method, setMethod] = useState<"cash" | "mobile_money" | "card">("cash");
  const subtotal = useMemo(() => lines.reduce((sum,l)=>sum+l.quantity*l.unitPrice.amount,0),[lines]);
  const total = subtotal + deliveryFee;

  return (
    <section className="rounded-[2rem] bg-white p-6 shadow-soft">
      <div className="flex items-start justify-between gap-4">
        <div><p className="text-sm text-slate-500">Checkout</p><h2 className="text-2xl font-black">Review order</h2></div>
        <div className="text-right"><p className="text-xs text-slate-500">Total</p><p className="text-2xl font-black">P{total.toFixed(2)}</p></div>
      </div>

      <div className="mt-5 space-y-3">
        {lines.map(line=>(
          <div key={line.id} className="flex justify-between text-sm">
            <span>{line.quantity}× {line.name}</span>
            <span>P{(line.quantity*line.unitPrice.amount).toFixed(2)}</span>
          </div>
        ))}
        <div className="flex justify-between border-t pt-3 text-sm"><span>Delivery</span><span>P{deliveryFee.toFixed(2)}</span></div>
      </div>

      <div className="mt-6">
        <p className="mb-2 text-sm font-bold">Payment</p>
        <div className="grid gap-2 sm:grid-cols-3">
          {[
            ["cash","Cash"],
            ["mobile_money","Mobile money"],
            ["card","Card"]
          ].map(([value,label])=>(
            <button key={value} onClick={()=>setMethod(value as typeof method)}
              className={`rounded-2xl border px-4 py-3 text-sm font-bold ${method===value?"border-slate-950 bg-slate-950 text-white":"border-slate-200"}`}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <Button className="mt-6 w-full" size="lg" onClick={()=>onPlaceOrder(method)}>
        Place local test order
      </Button>
    </section>
  );
}
