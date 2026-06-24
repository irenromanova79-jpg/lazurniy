import { C } from "../lib/colors";
import Card from "./ui/Card";
import type { ModelRow } from "../data/mockData";

// Универсальная таблица движений по моделям (выручка, март/апрель/Δ).
export default function DataTable({
  title, rows, note,
}: { title: string; rows: ModelRow[]; note?: string }) {
  return (
    <Card title={title} subtitle="Выручка, ₽">
      <div className="overflow-hidden rounded-lg border border-slate-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 text-left text-[11px] uppercase tracking-wide text-slate-500">
              <th className="px-3 py-2 font-semibold">Модель</th>
              <th className="px-3 py-2 text-right font-semibold">Март</th>
              <th className="px-3 py-2 text-right font-semibold">Апрель</th>
              <th className="px-3 py-2 text-right font-semibold">Δ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((m) => {
              const down = m.d.startsWith("−");
              return (
                <tr key={m.name}>
                  <td className="px-3 py-2 font-medium text-slate-700">{m.name}</td>
                  <td className="px-3 py-2 text-right text-slate-400">{m.mar.toLocaleString("ru-RU")}</td>
                  <td className="px-3 py-2 text-right font-medium" style={{ color: C.ink }}>{m.apr.toLocaleString("ru-RU")}</td>
                  <td className="px-3 py-2 text-right text-xs font-bold"
                    style={{ color: down ? C.neg : m.d === "новинка" ? C.bronze : C.pos }}>{m.d}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {note && <p className="mt-3 text-xs leading-relaxed text-slate-500">{note}</p>}
    </Card>
  );
}
