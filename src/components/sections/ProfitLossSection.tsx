import { Landmark } from "lucide-react";
import { C } from "../../lib/colors";
import { rub, pct } from "../../lib/format";
import { pnlHeadline as p, breakeven, channels } from "../../data/mockData";
import SectionHead from "../ui/SectionHead";
import KpiCard from "../ui/KpiCard";
import Card from "../ui/Card";
import Legend from "../ui/Legend";
import Delta from "../ui/Delta";
import MonthBars from "../charts/MonthBars";

function ChannelRow({ name, c }: { name: string; c: { profitMar: number; marginMar: number; profitApr: number; marginApr: number } }) {
  return (
    <tr>
      <td className="px-4 py-2.5 font-medium text-slate-700">{name}</td>
      <td className="px-4 py-2.5 text-right text-slate-500">{rub(c.profitMar)}</td>
      <td className="px-4 py-2.5 text-right text-slate-500">{pct(c.marginMar)}</td>
      <td className="px-4 py-2.5 text-right font-semibold" style={{ color: C.ink }}>{rub(c.profitApr)}</td>
      <td className="px-4 py-2.5 text-right">
        <Delta value={c.marginApr - c.marginMar} pp goodWhenUp />
      </td>
    </tr>
  );
}

export default function ProfitLossSection() {
  const rev = [
    { name: "Март", "Выручка": p.revenue.mar, "Чистая прибыль": p.netProfit.mar },
    { name: "Апрель", "Выручка": p.revenue.apr, "Чистая прибыль": p.netProfit.apr },
  ];
  return (
    <div className="space-y-6">
      <SectionHead icon={Landmark} title="Прибыль и рентабельность · ОПиУ"
        lead="Выручка +23,3%, чистая прибыль втрое — за счёт роста вклада каналов (+1,45 млн) и снижения накладных (−0,62 млн). Маржинальность стабильна ~32–33%, что делает точку безубыточности надёжной." />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Вклад каналов (до накладных)" valueApr={p.contrib.apr} valueMar={p.contrib.mar} accent />
        <KpiCard label="Накладные расходы" valueApr={p.overhead.apr} valueMar={p.overhead.mar} goodWhenUp={false} />
        <KpiCard label="Чистая прибыль" valueApr={p.netProfit.apr} valueMar={p.netProfit.mar} accent />
        <KpiCard label="Рентабельность по ЧП" valueApr={p.netMargin.apr} valueMar={p.netMargin.mar} fmt={pct} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card title="От выручки к прибыли" subtitle="Март против апреля, млн ₽">
          <MonthBars rows={rev} keys={[
            { key: "Выручка", name: "Выручка", color: C.navy },
            { key: "Чистая прибыль", name: "Чистая прибыль", color: C.bronze },
          ]} />
          <Legend items={[["Выручка", C.navy], ["Чистая прибыль", C.bronze]]} />
        </Card>

        <Card title="Точка безубыточности" subtitle="Метод маржинальной прибыли">
          <div className="grid grid-cols-3 gap-3">
            {breakeven.map((b) => (
              <div key={b.name} className="rounded-lg border border-slate-200 p-3">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">{b.name}</p>
                <p className="mt-1 text-lg font-bold" style={{ color: C.ink }}>{b.bep} млн</p>
                <p className="text-[11px] text-slate-400">ТБУ / мес</p>
                <div className="mt-2 border-t border-slate-100 pt-2 text-[11px] text-slate-500">
                  <div className="flex justify-between"><span>маржин.</span><span>{pct(b.margin)}</span></div>
                  <div className="flex justify-between"><span>запас</span>
                    <span className="font-semibold" style={{ color: b.safety > 25 ? C.pos : C.warn }}>{pct(b.safety)}</span></div>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-3 rounded-lg bg-slate-50 p-3 text-xs text-slate-600">
            Чтобы выйти в ноль, нужно продавать примерно <b style={{ color: C.ink }}>17,9 млн ₽/мес</b>.
            В апреле запас прочности вырос до 35,2% против 13,3% в марте.
          </p>
        </Card>
      </div>

      <Card title="Прибыльность по каналам" subtitle="Стабильный вклад ~32–33% при разнонаправленной марже">
        <div className="overflow-hidden rounded-lg border border-slate-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-left text-[11px] uppercase tracking-wide text-slate-500">
                <th className="px-4 py-2.5 font-semibold">Канал</th>
                <th className="px-4 py-2.5 text-right font-semibold">Прибыль март</th>
                <th className="px-4 py-2.5 text-right font-semibold">Маржа</th>
                <th className="px-4 py-2.5 text-right font-semibold">Прибыль апрель</th>
                <th className="px-4 py-2.5 text-right font-semibold">Маржа</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <ChannelRow name="Оптовый канал" c={channels.opt} />
              <ChannelRow name="Маркетплейсы" c={channels.mp} />
              <tr className="bg-slate-50 font-semibold" style={{ color: C.ink }}>
                <td className="px-4 py-2.5">Вклад каналов</td>
                <td className="px-4 py-2.5 text-right">{rub(channels.contrib.mar)}</td>
                <td className="px-4 py-2.5 text-right">{pct(channels.contrib.marMargin)}</td>
                <td className="px-4 py-2.5 text-right">{rub(channels.contrib.apr)}</td>
                <td className="px-4 py-2.5 text-right">{pct(channels.contrib.aprMargin)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
