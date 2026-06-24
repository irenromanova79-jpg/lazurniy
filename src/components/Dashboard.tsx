import { useState } from "react";
import { Factory } from "lucide-react";
import { C } from "../lib/colors";
import { meta } from "../data/mockData";
import ExecutiveSummary from "./sections/ExecutiveSummary";
import CashFlowSection from "./sections/CashFlowSection";
import ProfitLossSection from "./sections/ProfitLossSection";
import SalesChannelsSection from "./sections/SalesChannelsSection";
import CostsSection from "./sections/CostsSection";
import RisksPanel from "./sections/RisksPanel";
import RecommendationsPanel from "./sections/RecommendationsPanel";
import FiltersPanel from "./FiltersPanel";

const TABS = [
  { id: "overview", label: "Обзор", C: ExecutiveSummary },
  { id: "cash", label: "ОДДС", C: CashFlowSection },
  { id: "pnl", label: "ОПиУ", C: ProfitLossSection },
  { id: "channels", label: "Каналы", C: SalesChannelsSection },
  { id: "costs", label: "Расходы", C: CostsSection },
  { id: "risks", label: "Риски", C: RisksPanel },
  { id: "recs", label: "Рекомендации", C: RecommendationsPanel },
] as const;

export default function Dashboard() {
  const [tab, setTab] = useState<string>("overview");
  const Active = (TABS.find((t) => t.id === tab) ?? TABS[0]).C;
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
      <header style={{ background: "#0f172a" }}>
        <div className="mx-auto max-w-7xl px-6 py-5">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ background: C.bronze }}>
                <Factory size={20} color="#fff" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">{meta.company}</h1>
                <p className="text-xs text-slate-400">Финансовый кабинет руководителя · {meta.sector}</p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="text-right">
                <p className="text-[11px] uppercase tracking-widest" style={{ color: C.gold }}>Период анализа</p>
                <p className="text-sm font-semibold text-white">{meta.period}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-6">
          <nav className="flex gap-1 overflow-x-auto">
            {TABS.map((t) => {
              const on = t.id === tab;
              return (
                <button key={t.id} onClick={() => setTab(t.id)}
                  className="relative whitespace-nowrap px-4 py-3 text-sm font-medium transition-colors"
                  style={{ color: on ? "#fff" : "#94a3b8" }}>
                  {t.label}
                  {on && <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full" style={{ background: C.gold }} />}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-5 flex justify-end">
          <FiltersPanel />
        </div>
        <Active />
        <footer className="mt-10 border-t border-slate-200 pt-4 text-[11px] text-slate-400">
          Источник данных — аналитические записки ОДДС и ОПиУ за {meta.period}. Все показатели приведены без изменений.
          Помесячная маржа отдельных моделей опта приблизительна (учётная природа искажений себестоимости).
        </footer>
      </main>
    </div>
  );
}
