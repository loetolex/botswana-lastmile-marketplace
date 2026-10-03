import type { ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "ghost" | "success";
  size?: "default" | "sm" | "lg" | "icon";
};

export function Button({ className, variant="default", size="default", ...props }: Props) {
  const variants = {
    default:"bg-slate-950 text-white hover:bg-slate-800",
    outline:"border border-slate-200 bg-white text-slate-950 hover:bg-slate-50",
    ghost:"text-slate-700 hover:bg-slate-100",
    success:"bg-emerald-600 text-white hover:bg-emerald-700"
  };
  const sizes = {
    default:"h-11 px-5",
    sm:"h-9 px-4 text-sm",
    lg:"h-12 px-6",
    icon:"h-11 w-11"
  };
  return <button className={cn("inline-flex items-center justify-center rounded-full font-bold transition disabled:pointer-events-none disabled:opacity-50",variants[variant],sizes[size],className)} {...props}/>;
}
