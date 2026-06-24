import { C } from "../../lib/colors";
import { rub, sgn, deltaPct } from "../../lib/format";
import Delta from "./Delta";

export default function KpiCard({
  label, valueApr, valueMar, fmt = rub, goodWhenUp = true, note, accent,
}: {
  label: string;
  valueApr: number;
  valueMar?: number;
  fmt?: (n: number) => string;
  goodWhenUp?: boolean;
  note?: string;
  accent?: boolean;
}) {
  const showDelta = typeof valueMar === "number";
  const dv = showDelta ? valueApr - (valueMar as number) : 0;
  const dp = showDelta ? deltaPct(valueApr, valueMar as number) : 0;
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 transition-shadow hover:shadow-sm">
      <div className="flex items-start justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">{label}</p>
        {accent && <span className="h-1.5 w-1.5 rounded-full" style={{ background: C.bronze }} />}
      </div>
      <p className="mt-2 text-2xl font-bold tracking-tight" style={{ color: C.ink }}>{fmt(valueApr)}</p>
      {showDelta && (
        <div className="mt-1.5 flex items-center gap-2 text-xs text-slate-400">
          <Delta value={dv} goodWhenUp={goodWhenUp} suffix=" ₽" />
          <span>·</span>
          <span style={{ color: dp > 0 === goodWhenUp ? C.pos : C.neg }}>{sgn(dp)}%</span>
        </div>
      )}
      {note && <p className="mt-2 text-xs leading-snug text-slate-500">{note}</p>}
      {showDelta && <p className="mt-1 text-[11px] text-slate-400">март: {fmt(valueMar as number)}</p>}
    </div>
  );
}
