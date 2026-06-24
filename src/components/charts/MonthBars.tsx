import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
} from "recharts";
import { C } from "../../lib/colors";
import { TooltipRub } from "./tooltip";

export interface BarKey { key: string; name: string; color: string }

export default function MonthBars({
  rows, keys, height = 260, fmt = (v: number) => (v / 1e6).toFixed(1),
}: { rows: any[]; keys: BarKey[]; height?: number; fmt?: (v: number) => string }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={rows} margin={{ top: 16, right: 8, left: 8, bottom: 8 }} barGap={6}>
        <CartesianGrid vertical={false} stroke={C.line} />
        <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#64748b" }} tickLine={false} axisLine={{ stroke: C.line }} />
        <YAxis tickFormatter={fmt} tick={{ fontSize: 11, fill: "#94a3b8" }} tickLine={false} axisLine={false} width={32} />
        <Tooltip content={<TooltipRub />} cursor={{ fill: "rgba(15,23,42,0.03)" }} />
        {keys.map((k) => <Bar key={k.key} dataKey={k.key} name={k.name} fill={k.color} radius={[3, 3, 0, 0]} maxBarSize={42} />)}
      </BarChart>
    </ResponsiveContainer>
  );
}
