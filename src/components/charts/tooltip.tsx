import { C } from "../../lib/colors";
import { rub } from "../../lib/format";

export function TooltipRub({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs shadow-sm">
      <p className="mb-1 font-semibold" style={{ color: C.ink }}>{label}</p>
      {payload.filter((p: any) => p.dataKey !== "_base").map((p: any, i: number) => (
        <p key={i} style={{ color: p.color || p.fill }}>
          {p.name}: <span className="font-semibold">{rub(p.value)}</span>
        </p>
      ))}
    </div>
  );
}
