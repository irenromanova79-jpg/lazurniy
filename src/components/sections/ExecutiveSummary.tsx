import { CircleDollarSign, TrendingUp, ShieldAlert } from "lucide-react";
import { C } from "../../lib/colors";
import { rub, mln, pct, sgn } from "../../lib/format";
import { cashHeadline as c, pnlHeadline as p, pnlBridge, cashBridge, channels } from "../../data/mockData";
import StatusPill from "../ui/StatusPill";
import KpiCard from "../ui/KpiCard";
import Card from "../ui/Card";
import Waterfall from "../charts/Waterfall";

export default function ExecutiveSummary() {
  const cards = [
    { i: CircleDollarSign, h: "Деньги вышли в плюс — но фактор сезонный",
      t: `Совокупный ЧДП ${sgn(c.total.apr / 1e6)} млн против ${mln(c.total.mar)} в марте. Без паузы в древесине и продажи оборудования было бы ≈ +0,47 млн.` },
    { i: TrendingUp, h: "Прибыль выросла втрое",
      t: `Чистая прибыль ${mln(p.netProfit.mar)} → ${mln(p.netProfit.apr)} (рентабельность ${pct(p.netMargin.mar)} → ${pct(p.netMargin.apr)}). Чистый операционный результат.` },
    { i: ShieldAlert, h: "Экономика площадок ухудшается",
      t: `Маржа маркетплейсов ${pct(channels.mp.marginMar)} → ${pct(channels.mp.marginApr)} из-за комиссии и продвижения, а не товара. Опт растёт, но часть роста — структура НДС.` },
  ];
  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-2xl border border-slate-200">
        <div className="px-6 py-5" style={{ background: "linear-gradient(180deg,#0f172a,#1e293b)" }}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: C.gold }}>
              Резюме для руководителя · апрель 2026
            </span>
            <StatusPill status="warn" />
          </div>
          <p className="mt-3 max-w-4xl text-[15px] leading-relaxed text-slate-200">
            Апрель кратно лучше марта по прибыли и развернул деньги в плюс. Но улучшение во многом
            <span style={{ color: C.gold }}> сезонное и разовое</span>: денежный поток поддержала пауза в закупке
            древесины и разовая продажа оборудования. Маркетплейсы теряют маржу из-за площадки, опт растёт — но частично неоперационно.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-px bg-slate-200 md:grid-cols-3">
          {cards.map((x, i) => (
            <div key={i} className="bg-white p-5">
              <x.i size={18} style={{ color: C.bronze }} />
              <p className="mt-2 text-sm font-bold" style={{ color: C.ink }}>{x.h}</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-600">{x.t}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Выручка" valueApr={p.revenue.apr} valueMar={p.revenue.mar} accent />
        <KpiCard label="Чистая прибыль" valueApr={p.netProfit.apr} valueMar={p.netProfit.mar} accent />
        <KpiCard label="Рентабельность по ЧП" valueApr={p.netMargin.apr} valueMar={p.netMargin.mar} fmt={pct} />
        <KpiCard label="Совокупный ЧДП" valueApr={c.total.apr} valueMar={c.total.mar} accent
          note="Без сезонного фактора было бы ≈ +0,47 млн." />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card title="Почему выросла прибыль" subtitle="Мост чистой прибыли, март → апрель">
          <Waterfall steps={pnlBridge} />
        </Card>
        <Card title="Из чего сложился денежный поток" subtitle="Совокупный ЧДП апреля по направлениям">
          <Waterfall steps={cashBridge} />
        </Card>
      </div>
    </div>
  );
}
