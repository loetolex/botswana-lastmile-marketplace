import type { HTMLAttributes } from "react";
import { cn } from "../../lib/utils";

export function Card({className,...props}:HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("rounded-[2rem] bg-white shadow-soft",className)} {...props}/>;
}
export function CardHeader({className,...props}:HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-6 pb-3",className)} {...props}/>;
}
export function CardContent({className,...props}:HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-6 pt-3",className)} {...props}/>;
}
