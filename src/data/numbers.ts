/**
 * Dữ liệu học số 0–100: tên tiếng Việt và emoji minh họa số lượng.
 */

const UNITS = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];

/** Đọc tên số tiếng Việt (0–100). */
export function numberName(n: number): string {
  if (n < 0 || n > 100) return String(n);
  if (n < 10) return UNITS[n];
  if (n === 10) return 'mười';
  if (n < 20) {
    const unit = n % 10;
    if (unit === 0) return 'mười';
    if (unit === 5) return 'mười lăm';
    return `mười ${UNITS[unit]}`;
  }
  if (n === 100) return 'một trăm';
  const tens = Math.floor(n / 10);
  const unit = n % 10;
  let name = `${UNITS[tens]} mươi`;
  if (unit === 1) name += ' mốt';
  else if (unit === 5) name += ' lăm';
  else if (unit !== 0) name += ` ${UNITS[unit]}`;
  return name;
}

/** Emoji minh họa xoay vòng theo số. */
export const COUNT_EMOJIS = ['🍎', '🍌', '⭐', '🐟', '🌸', '🎈', '🍓', '🐤', '🚗', '🍭'];

export function emojiForNumber(n: number): string {
  return COUNT_EMOJIS[n % COUNT_EMOJIS.length];
}

/** Danh sách số 0–100 (dùng cho lưới chọn nhanh nếu cần). */
export const NUMBERS: number[] = Array.from({ length: 101 }, (_, i) => i);
