import { PackageSearch, TrendingUp, TrendingDown } from "lucide-react";
import { C } from "../../lib/colors";
import { pct } from "../../lib/format";
import { purchases, cashHeadline } from "../../data/mockData";
import SectionHead from "../ui/SectionHead";
import KpiCard from "../ui/KpiCard";
import Card from "../ui/Card";

export default function CostsSection() {
  const rows = [...purchases].sort((a, b) => b.apr - a.apr);
  return (
    <div className="space-y-6">
      <SectionHead icon={PackageSearch} title="Расходы и себестоимость"
        lead="Структура закупок сместилась: древесина рухнула с 29,5% до 7,3% (сезонную закупку не повторяли), на первый план вышел лак-краска-клей (28,0%). Три категории — ЛКМ, упаковка и полуфабрикаты — дают 59% материальных платежей." />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <KpiCard label="Оплата поставщикам, всего" valueApr={cashHeadline.suppliers.apr} valueMar={cashHeadline.suppliers.mar} goodWhenUp={false} accent />
        <KpiCard label="Древесина" valueApr={255600} valueMar={2355777} goodWhenUp={false}
          note="Доля 29,5% → 7,3%: пауза сезонной закупки." />
        <KpiCard label="Лак, краска, клей" valueApr={983968} valueMar={1498625} goodWhenUp={false}
          note="Вышла на первое место — доля 28,0%. Точка контроля цен." />
      </div>

      <Card title="Структура закупок по категориям" subtitle="Доля в платежах поставщикам, % · март против апреля">
        <div className="space-y-2.5">
          {rows.map((r) => {
            const wood = r.name === "Древесина";
            const up = r.aprS > r.marS;
            return (
              <div key={r.name} className="flex items-center gap-3">
                <span className="w-44 shrink-0 text-sm text-slate-700">{r.name}</span>
                <div className="relative h-7 flex-1 rounded bg-slate-50">
                  <div className="absolute inset-y-0 left-0 rounded bg-slate-200" style={{ width: `${r.marS * 3}%` }} />
                  <div className="absolute inset-y-0 left-0 flex items-center justify-end rounded px-2"
                    style={{ width: `${r.aprS * 3}%`, minWidth: 38, background: wood ? C.neg : up ? C.bronze : C.navy, opacity: 0.92 }}>
                    <span className="text-[11px] font-semibold text-white">{pct(r.aprS)}</span>
                  </div>
                </div>
                <span className="w-12 shrink-0 text-right text-[11px] text-slate-400">{pct(r.marS)}</span>
                <span className="w-7 shrink-0 text-center">
                  {up ? <TrendingUp size={13} color={C.bronze} /> : <TrendingDown size={13} color={C.neg} />}
                </span>
              </div>
            );
          })}
        </div>
        <p className="mt-3 text-xs text-slate-500">
          Светлая полоса — доля в марте, цветная — в апреле. <span style={{ color: C.bronze }}>Бронза</span> — доля выросла,
          <span style={{ color: C.neg }}> серый</span> — снизилась. Категории, где доля растёт, напрямую влияют на себестоимость.
        </p>
      </Card>
    </div>
  );
}
