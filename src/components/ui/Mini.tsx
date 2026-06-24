import { ReactNode } from "react";
import { C } from "../../lib/colors";

export default function Mini({ label, v, d }: { label: string; v: string; d: ReactNode }) {
  return (
    <div className="rounded-lg border border-slate-100 bg-slate-50 p-3">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 text-base font-bold" style={{ color: C.ink }}>{v}</p>
      <div className="mt-0.5">{d}</div>
    </div>
  );
}
