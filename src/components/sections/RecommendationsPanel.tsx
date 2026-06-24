import { ChevronRight } from "lucide-react";
import { C } from "../../lib/colors";
import { recs } from "../../data/mockData";
import SectionHead from "../ui/SectionHead";

export default function RecommendationsPanel() {
  return (
    <div className="space-y-6">
      <SectionHead icon={ChevronRight} title="Что делать в мае"
        lead="Конкретные действия, привязанные к показателям: что делать, зачем, какой показатель контролировать и какой эффект ожидать." />
      <div className="space-y-3">
        {recs.map((r, i) => (
          <div key={i} className="flex gap-4 rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white"
              style={{ background: "#0f172a" }}>{i + 1}</div>
            <div className="grid flex-1 grid-cols-1 gap-x-6 gap-y-1.5 md:grid-cols-12">
              <div className="md:col-span-4">
                <p className="text-sm font-bold" style={{ color: C.ink }}>{r.act}</p>
                <p className="mt-0.5 text-xs text-slate-500">{r.why}</p>
              </div>
              <div className="md:col-span-4">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">Контролировать</p>
                <p className="text-xs text-slate-700">{r.metric}</p>
              </div>
              <div className="md:col-span-4">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">Ожидаемый эффект</p>
                <p className="text-xs font-medium" style={{ color: C.pos }}>{r.effect}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
