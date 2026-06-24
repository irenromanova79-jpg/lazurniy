import { Store, Building2 } from "lucide-react";
import { C } from "../../lib/colors";
import { rub, pct, deltaPct } from "../../lib/format";
import { channels, mpCosts, mpModels, optModels } from "../../data/mockData";
import SectionHead from "../ui/SectionHead";
import Card from "../ui/Card";
import Mini from "../ui/Mini";
import Delta from "../ui/Delta";
import StatusPill from "../ui/StatusPill";
import DataTable from "../DataTable";

export default function SalesChannelsSection() {
  const { opt, mp } = channels;
  const max = 6307608;
  return (
    <div className="space-y-6">
      <SectionHead icon={Store} title="Каналы продаж"
        lead="Опт и маркетплейсы движутся в разные стороны: опт растёт по прибыли и марже, маркетплейсы теряют маржу из-за затрат площадки. Структура продаж заметно сместилась в обоих каналах." />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Опт */}
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building2 size={18} style={{ color: C.opt }} />
              <h3 className="text-sm font-bold" style={{ color: C.ink }}>Оптовый канал</h3>
            </div>
            <StatusPill status="good" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Mini label="Прибыль" v={rub(opt.profitApr)} d={<Delta value={deltaPct(opt.profitApr, opt.profitMar)} suffix="%" />} />
            <Mini label="Маржа" v={pct(opt.marginApr)} d={<Delta value={opt.marginApr - opt.marginMar} pp />} />
            <Mini label="Объём, шт" v={opt.qtyApr.toLocaleString("ru-RU")} d={<Delta value={deltaPct(opt.qtyApr, opt.qtyMar)} suffix="%" />} />
            <Mini label="Средний чек" v={rub(opt.checkApr)} d={<Delta value={deltaPct(opt.checkApr, opt.checkMar)} suffix="%" goodWhenUp />} />
          </div>
          <p className="mt-3 rounded-lg bg-slate-50 p-3 text-xs leading-relaxed text-slate-600">
            Маржа +12,7 п.п., но <b>часть роста неоперационная</b>: снижение доли НДС (+6,9 п.п.) — следствие структуры
            покупателей. Рост в штуках при падении чека (−15%) — сдвиг к более дешёвым позициям (Каркас BAXTER).
          </p>
        </div>

        {/* Маркетплейсы */}
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Store size={18} style={{ color: C.mp }} />
              <h3 className="text-sm font-bold" style={{ color: C.ink }}>Маркетплейсы</h3>
            </div>
            <StatusPill status="warn" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Mini label="Прибыль" v={rub(mp.profitApr)} d={<Delta value={deltaPct(mp.profitApr, mp.profitMar)} suffix="%" />} />
            <Mini label="Маржа" v={pct(mp.marginApr)} d={<Delta value={mp.marginApr - mp.marginMar} pp />} />
            <Mini label="Объём, шт" v={mp.qtyApr.toLocaleString("ru-RU")} d={<Delta value={deltaPct(mp.qtyApr, mp.qtyMar)} suffix="%" />} />
            <Mini label="Средний чек" v={rub(mp.checkApr)} d={<Delta value={deltaPct(mp.checkApr, mp.checkMar)} suffix="%" goodWhenUp />} />
          </div>
          <p className="mt-3 rounded-lg bg-amber-50 p-3 text-xs leading-relaxed" style={{ color: "#78350f" }}>
            По товару канал <b>улучшился</b> (валовая маржа 82,4 → 87,0%), но всю просадку забрали затраты площадок
            (54,4 → 66,5% выручки канала). Проблема — в экономике площадки, а не в товаре.
          </p>
        </div>
      </div>

      <Card title="Что съело маржу маркетплейсов" subtitle="Затраты площадок, март → апрель (всего +57%: 7,34 → 11,51 млн ₽)">
        <div className="space-y-2">
          {mpCosts.map((m) => (
            <div key={m.name} className="flex items-center gap-3">
              <span className="w-44 shrink-0 text-sm text-slate-700">{m.name}</span>
              <div className="relative h-7 flex-1 rounded bg-slate-50">
                <div className="absolute inset-y-0 left-0 rounded bg-slate-200" style={{ width: `${(m.mar / max) * 100}%` }} />
                <div className="absolute inset-y-0 left-0 rounded" style={{ width: `${(m.apr / max) * 100}%`, background: m.name === "Комиссия" || m.name === "Продвижение / реклама" ? C.bronze : C.navy, opacity: 0.92 }} />
              </div>
              <span className="w-16 shrink-0 text-right text-xs font-semibold"
                style={{ color: m.note.startsWith("×") || parseInt(m.note) > 50 ? C.bronze : C.navy }}>{m.note}</span>
              <span className="hidden w-28 shrink-0 text-right text-[11px] text-slate-400 sm:block">{m.sh}</span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-slate-500">Светлая полоса — март, тёмная — апрель. Бронзой выделены главные драйверы: комиссия (+2,54 млн) и продвижение (×2,9).</p>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <DataTable title="Маркетплейсы — ключевые движения" rows={mpModels}
          note="Спрос концентрируется на семействе «Гольф» + рывок Форио. Харли — единственный заметный спад." />
        <DataTable title="Опт — ключевые движения" rows={optModels}
          note="Серьёзная ротация: вверх Бергольф, Гольф 1, Элин; появился Каркас BAXTER; просели Веста (−73%) и Бергольф полубарный (−92%)." />
      </div>
    </div>
  );
}
