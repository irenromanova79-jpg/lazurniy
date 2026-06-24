import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { C } from "../../lib/colors";

export default function Delta({
  value, suffix = "", goodWhenUp = true, pp = false,
}: { value: number; suffix?: string; goodWhenUp?: boolean; pp?: boolean }) {
  const up = value > 0, flat = value === 0;
  const good = flat ? null : up === goodWhenUp;
  const color = good === null ? C.slate : good ? C.pos : C.neg;
  const Icon = flat ? Minus : up ? TrendingUp : TrendingDown;
  const sign = up ? "+" : value < 0 ? "−" : "";
  const num = Math.abs(value).toLocaleString("ru-RU", { maximumFractionDigits: 1 });
  return (
    <span className="inline-flex items-center gap-1 text-sm font-semibold" style={{ color }}>
      <Icon size={14} strokeWidth={2.4} /> {sign}{num}{pp ? " п.п." : suffix}
    </span>
  );
}
