/** Trộn ngẫu nhiên một mảng (không thay đổi mảng gốc). */
export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Số nguyên ngẫu nhiên trong [min, max]. */
export function randInt(min: number, max: number): number {
  return min + Math.floor(Math.random() * (max - min + 1));
}

/** Lấy ngẫu nhiên n phần tử khác nhau từ mảng. */
export function sample<T>(arr: T[], n: number): T[] {
  return shuffle(arr).slice(0, n);
}
