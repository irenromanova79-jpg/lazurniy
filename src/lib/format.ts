export const rub = (n: number) => Math.round(n).toLocaleString("ru-RU") + " ₽";
export const mln = (n: number) =>
  (n / 1e6).toLocaleString("ru-RU", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " млн";
export const pct = (n: number) => n.toLocaleString("ru-RU", { maximumFractionDigits: 1 }) + "%";
export const sgn = (n: number) =>
  (n > 0 ? "+" : n < 0 ? "−" : "") + Math.abs(Math.round(n)).toLocaleString("ru-RU");
export const deltaPct = (a: number, b: number) => (b === 0 ? 0 : ((a - b) / Math.abs(b)) * 100);
