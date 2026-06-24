export default function Legend({ items }: { items: [string, string][] }) {
  return (
    <div className="mt-3 flex flex-wrap gap-4">
      {items.map(([t, col]) => (
        <span key={t} className="flex items-center gap-1.5 text-xs text-slate-500">
          <span className="h-2.5 w-2.5 rounded-sm" style={{ background: col }} />{t}
        </span>
      ))}
    </div>
  );
}
