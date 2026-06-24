import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, LabelList,
} from "recharts";
import { C } from "../../lib/colors";
import { sgn } from "../../lib/format";
import { TooltipRub } from "./tooltip";
import type { BridgeStep } from "../../data/mockData";

export default function Waterfall({ steps, height = 280 }: { steps: BridgeStep[]; height?: number }) {
  let cum = 0;
  const rows = steps.map((s) => {
    if (s.type === "total") { cum = s.value; return { ...s, _base: 0, _bar: s.value }; }
    const start = cum, end = cum + s.value; cum = end;
    return { ...s, _base: Math.min(start, end), _bar: Math.abs(s.value) };
  });
  const color = (t: string) => (t === "total" ? C.ink : t === "pos" ? C.pos : C.neg);
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={rows} margin={{ top: 24, right: 8, left: 8, bottom: 8 }}>
        <CartesianGrid vertical={false} stroke={C.line} />
        <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#64748b" }} interval={0} tickLine={false} axisLine={{ stroke: C.line }} />
        <YAxis tickFormatter={(v: number) => (v / 1e6).toFixed(1)} tick={{ fontSize: 11, fill: "#94a3b8" }} tickLine={false} axisLine={false} width={32} />
        <Tooltip content={<TooltipRub />} cursor={{ fill: "rgba(15,23,42,0.03)" }} />
        <Bar dataKey="_base" stackId="w" fill="transparent" />
        <Bar dataKey="_bar" stackId="w" radius={[3, 3, 0, 0]} maxBarSize={64}>
          {rows.map((r, i) => <Cell key={i} fill={color(r.type)} />)}
          <LabelList dataKey="value" position="top"
            formatter={(v: number) => sgn(v / 1e6) + " млн"}
            style={{ fontSize: 10, fontWeight: 700, fill: C.navy }} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
