import { ReactNode } from "react";
import { C } from "../../lib/colors";

export default function Card({
  title, subtitle, children, right,
}: { title?: string; subtitle?: string; children: ReactNode; right?: ReactNode }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      {(title || right) && (
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            {title && <h3 className="text-sm font-bold" style={{ color: C.ink }}>{title}</h3>}
            {subtitle && <p className="mt-0.5 text-xs text-slate-500">{subtitle}</p>}
          </div>
          {right}
        </div>
      )}
      {children}
    </div>
  );
}
