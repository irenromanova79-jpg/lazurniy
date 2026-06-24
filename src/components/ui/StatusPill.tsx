type Status = "risk" | "warn" | "good";
const map: Record<Status, { bg: string; fg: string; br: string; t: string }> = {
  risk: { bg: "#fef2f2", fg: "#b91c1c", br: "#fecaca", t: "Риск" },
  warn: { bg: "#fffbeb", fg: "#b45309", br: "#fde68a", t: "Внимание" },
  good: { bg: "#ecfdf5", fg: "#047857", br: "#a7f3d0", t: "Хорошо" },
};
export default function StatusPill({ status }: { status: Status }) {
  const s = map[status];
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
      style={{ background: s.bg, color: s.fg, border: `1px solid ${s.br}` }}>
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: s.fg }} />
      {s.t}
    </span>
  );
}
