import { Calendar } from "lucide-react";
import { C } from "../lib/colors";
import { meta } from "../data/mockData";

/**
 * Панель фильтров. В текущей версии период фиксирован (март–апрель 2026),
 * поэтому фильтр работает как индикатор выбранного периода. При подключении
 * нескольких периодов сюда добавляется выпадающий список с onChange.
 */
export default function FiltersPanel() {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs">
      <Calendar size={14} style={{ color: C.bronze }} />
      <span className="font-semibold text-slate-600">Период:</span>
      <span className="font-medium text-slate-500">{meta.period}</span>
    </div>
  );
}
