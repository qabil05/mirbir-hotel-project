export const DATE_MAX = "2030-12-31";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function todayLocal(): string {
  const d = new Date();
  return toIso(d.getFullYear(), d.getMonth() + 1, d.getDate());
}

export function toIso(y: number, m: number, d: number): string {
  return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

export function parseIso(isoDate: string): { y: number; m: number; d: number } | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(isoDate)) return null;
  const [y, m, d] = isoDate.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  if (Number.isNaN(dt.getTime())) return null;
  return { y, m, d };
}

export function addDays(isoDate: string, days: number): string {
  const p = parseIso(isoDate);
  if (!p) return "";
  const next = new Date(p.y, p.m - 1, p.d + days);
  return toIso(next.getFullYear(), next.getMonth() + 1, next.getDate());
}

export function clampDate(value: string, min: string, max: string): string {
  if (!parseIso(value)) return "";
  if (value < min) return min;
  if (value > max) return max;
  return value;
}

export function nightsBetween(a: string, b: string): number {
  const pa = parseIso(a);
  const pb = parseIso(b);
  if (!pa || !pb) return 1;
  const t1 = new Date(pa.y, pa.m - 1, pa.d).getTime();
  const t2 = new Date(pb.y, pb.m - 1, pb.d).getTime();
  return Math.max(1, Math.round((t2 - t1) / 86400000));
}

export function formatDay(isoDate: string): string {
  const p = parseIso(isoDate);
  if (!p) return "Pick a day";
  return `${p.d} ${MONTHS[p.m - 1]}`;
}

export function monthLabel(y: number, m: number): string {
  return `${MONTHS[m - 1]} ${y}`;
}

export function monthCells(y: number, m: number): Array<{ iso: string; inMonth: boolean } | null> {
  const first = new Date(y, m - 1, 1);
  const startPad = first.getDay() === 0 ? 6 : first.getDay() - 1;
  const days = new Date(y, m, 0).getDate();
  const cells: Array<{ iso: string; inMonth: boolean } | null> = [];
  for (let i = 0; i < startPad; i += 1) cells.push(null);
  for (let d = 1; d <= days; d += 1) {
    cells.push({ iso: toIso(y, m, d), inMonth: true });
  }
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}
