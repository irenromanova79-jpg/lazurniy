import { AlertTriangle, Gauge } from "lucide-react";
import { C } from "../../lib/colors";
import { risks, type RiskLevel } from "../../data/mockData";
import SectionHead from "../ui/SectionHead";

const order: Record<RiskLevel, number> = { "Высокий": 0, "Средний": 1, "Низкий": 2 };

function lvlStyle(l: RiskLevel) {
  if (l === "Высокий") return { bg: "#fef2f2", fg: C.risk, br: "#fecaca" };
  if (l === "Средний") return { bg: "#fffbeb", fg: C.warn, br: "#fde68a" };
  return { bg: "#f1f5f9", fg: "#475569", br: "#e2e8f0" };
}

export default function RisksPanel() {
  const rows = [...risks].sort((a, b) => order[a.lvl] - order[b.lvl]);
  return (
    <div className="space-y-6">
      <SectionHead icon={AlertTriangle} title="Панель рисков"
        lead="Риски привязаны к конкретным цифрам, а не к общим формулировкам. Для каждого — показатель-сигнал и что контролировать в мае." />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {rows.map((r) => {
          const s = lvlStyle(r.lvl);
          return (
            <div key={r.t} className="rounded-xl border bg-white p-4" style={{ borderColor: s.br }}>
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-bold leading-snug" style={{ color: C.ink }}>{r.t}</p>
                <span className="shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
                  style={{ background: s.bg, color: s.fg, border: `1px solid ${s.br}` }}>{r.lvl}</span>
              </div>
              <div className="mt-2 rounded-lg bg-slate-50 px-3 py-2">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">Сигнал</p>
                <p className="text-xs font-medium" style={{ color: s.fg }}>{r.sig}</p>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">{r.why}</p>
              <div className="mt-2 flex items-start gap-1.5 text-xs text-slate-500">
                <Gauge size={13} className="mt-0.5 shrink-0" style={{ color: C.bronze }} />
                <span><b className="text-slate-600">Контроль:</b> {r.ctrl}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
