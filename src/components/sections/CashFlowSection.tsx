import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine,
} from "recharts";
import { Wallet, ArrowRight } from "lucide-react";
import { C } from "../../lib/colors";
import { rub, mln, pct, deltaPct } from "../../lib/format";
import { cashHeadline as c, payments } from "../../data/mockData";
import SectionHead from "../ui/SectionHead";
import KpiCard from "../ui/KpiCard";
import Card from "../ui/Card";
import Legend from "../ui/Legend";
import Delta from "../ui/Delta";
import { TooltipRub } from "../charts/tooltip";

function FlowRow({ label, mar, apr, goodWhenUp = true, sub }:
  { label: string; mar: number; apr: number; goodWhenUp?: boolean; sub?: boolean }) {
  return (
    <div className={`flex items-center justify-between ${sub ? "pl-3" : ""}`}>
      <span className={`text-sm ${sub ? "text-slate-500" : "text-slate-700"}`}>{label}</span>
      <div className="flex items-center gap-3">
        <span className="text-sm text-slate-400">{mln(mar)}</span>
        <Delta value={deltaPct(apr, mar)} suffix="%" goodWhenUp={goodWhenUp} />
        <span className="w-24 text-right text-sm font-semibold" style={{ color: C.ink }}>{mln(apr)} ₽</span>
      </div>
    </div>
  );
}

export default function CashFlowSection() {
  const activity = [
    { name: "Операционная", mar: c.oper.mar, apr: c.oper.apr },
    { name: "Инвестиционная", mar: c.invest.mar, apr: c.invest.apr },
    { name: "Финансовая", mar: c.finance.mar, apr: c.finance.apr },
    { name: "Совокупный", mar: c.total.mar, apr: c.total.apr },
  ];
  return (
    <div className="space-y-6">
      <SectionHead icon={Wallet} title="Денежный поток · ОДДС"
        lead="Разворот в плюс обеспечила операционная деятельность — но за счёт нормализации закупок, а не роста выручки деньгами. Платежи поставщикам упали вдвое (−4,47 млн): в марте создавали сезонный запас, в апреле его не пополняли." />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Операционный ЧДП" valueApr={c.oper.apr} valueMar={c.oper.mar} accent />
        <KpiCard label="Инвестиционный ЧДП" valueApr={c.invest.apr} valueMar={c.invest.mar} note="Разовая продажа оборудования +0,54 млн." />
        <KpiCard label="Финансовый ЧДП" valueApr={c.finance.apr} valueMar={c.finance.mar} goodWhenUp={false} note="Изъятие 0,80 млн + возврат займа 0,23 млн." />
        <KpiCard label="Оплата поставщикам" valueApr={c.suppliers.apr} valueMar={c.suppliers.mar} goodWhenUp={false} note="Вдвое ниже марта — пауза в закупке древесины." />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card title="ЧДП по направлениям деятельности" subtitle="млн ₽ · март против апреля">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={activity} margin={{ top: 16, right: 8, left: 8, bottom: 8 }} barGap={6}>
              <CartesianGrid vertical={false} stroke={C.line} />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#64748b" }} tickLine={false} axisLine={{ stroke: C.line }} />
              <YAxis tickFormatter={(v: number) => (v / 1e6).toFixed(1)} tick={{ fontSize: 11, fill: "#94a3b8" }} tickLine={false} axisLine={false} width={32} />
              <ReferenceLine y={0} stroke="#cbd5e1" />
              <Tooltip content={<TooltipRub />} cursor={{ fill: "rgba(15,23,42,0.03)" }} />
              <Bar dataKey="mar" name="Март" fill={C.slateL} radius={[3, 3, 0, 0]} maxBarSize={40} />
              <Bar dataKey="apr" name="Апрель" fill={C.ink} radius={[3, 3, 0, 0]} maxBarSize={40} />
            </BarChart>
          </ResponsiveContainer>
          <Legend items={[["Март", C.slateL], ["Апрель", C.ink]]} />
        </Card>

        <Card title="Поступления и платежи" subtitle="Дело не в выручке деньгами, а в снижении платежей">
          <div className="space-y-3">
            <FlowRow label="Операционные поступления" mar={c.inflow.mar} apr={c.inflow.apr} />
            <FlowRow label="Операционные платежи" mar={c.outflow.mar} apr={c.outflow.apr} goodWhenUp={false} />
            <FlowRow label="в т.ч. оплата поставщикам" mar={c.suppliers.mar} apr={c.suppliers.apr} goodWhenUp={false} sub />
            <div className="mt-2 rounded-lg bg-slate-50 p-3">
              <p className="text-xs text-slate-500">Операционный ЧДП</p>
              <div className="mt-1 flex items-center justify-between">
                <span className="text-sm text-slate-400">{rub(c.oper.mar)}</span>
                <ArrowRight size={14} className="text-slate-300" />
                <span className="text-base font-bold" style={{ color: C.pos }}>{rub(c.oper.apr)}</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Card title="Крупнейшие операционные платежи · апрель" subtitle="Три статьи — 72,6% всех платежей">
        <div className="space-y-2.5">
          {payments.map((pm) => (
            <div key={pm.name} className="flex items-center gap-3">
              <span className="w-56 shrink-0 text-sm text-slate-700">{pm.name}</span>
              <div className="h-6 flex-1 rounded bg-slate-100">
                <div className="flex h-6 items-center justify-end rounded px-2"
                  style={{ width: `${pm.share * 2.4}%`, minWidth: 64, background: pm.name === "Оплата поставщикам" ? C.bronze : C.navy }}>
                  <span className="text-[11px] font-semibold text-white">{pct(pm.share)}</span>
                </div>
              </div>
              <span className="w-28 shrink-0 text-right text-sm font-semibold" style={{ color: C.ink }}>{mln(pm.val)} ₽</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
