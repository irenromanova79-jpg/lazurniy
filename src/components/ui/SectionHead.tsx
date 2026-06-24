import { LucideIcon } from "lucide-react";
import { C } from "../../lib/colors";

export default function SectionHead({
  icon: Icon, title, lead,
}: { icon: LucideIcon; title: string; lead?: string }) {
  return (
    <div className="mb-5 flex items-start gap-3">
      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg" style={{ background: "#0f172a" }}>
        <Icon size={18} color={C.gold} strokeWidth={2} />
      </div>
      <div>
        <h2 className="text-lg font-bold" style={{ color: C.ink }}>{title}</h2>
        {lead && <p className="mt-0.5 max-w-3xl text-sm leading-relaxed text-slate-600">{lead}</p>}
      </div>
    </div>
  );
}
