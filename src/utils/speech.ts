import * as Speech from 'expo-speech';

/**
 * Phát âm tiếng Việt cho bé, chọn giọng đọc hay nhất có trên máy và
 * đọc đúng tên bé "An Bơ" (không đánh vần từng chữ).
 */

let selectedVoice: string | undefined;
let voicePicked = false;

/** Tìm giọng đọc tiếng Việt chất lượng cao nhất có sẵn. */
async function pickBestVoice() {
  if (voicePicked) return;
  voicePicked = true;
  try {
    const voices = await Speech.getAvailableVoicesAsync();
    const vi = voices.filter(v => (v.language || '').toLowerCase().startsWith('vi'));
    if (vi.length === 0) return;
    const preferred =
      vi.find(v => /google/i.test(`${v.name} ${v.identifier}`)) ||
      vi.find(v => /natural|neural|wavenet|premium/i.test(`${v.name}`)) ||
      vi.find(v => (v.quality || '').toLowerCase() === 'enhanced') ||
      vi[0];
    selectedVoice = preferred.identifier;
  } catch {
    // Không lấy được danh sách giọng → dùng mặc định vi-VN.
  }
}
pickBestVoice();

/** Chuẩn hóa văn bản trước khi đọc: đọc đúng tên bé, bỏ emoji. */
function normalize(text: string): string {
  return text
    .replace(/AN\s*BƠ/gi, 'An Bơ')
    .replace(/[\p{Extended_Pictographic}\u{FE0F}]/gu, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Đọc to một câu tiếng Việt cho bé nghe. */
export function speak(text: string) {
  const clean = normalize(text);
  if (!clean) return;
  Speech.stop();
  Speech.speak(clean, {
    language: 'vi-VN',
    voice: selectedVoice,
    rate: 0.92,
    pitch: 1.05,
  });
}

export const PRAISES = [
  'Giỏi quá! 🎉',
  'Bé làm đúng rồi! 👏',
  'Tuyệt vời! ⭐',
  'Xuất sắc lắm! 🌟',
  'Bé thật thông minh! 🧠',
  'Đúng rồi, hoan hô bé! 🥳',
];

export const ENCOURAGES = [
  'Cố lên nhé! 💪',
  'Thử lại nào bé ơi! 🍀',
  'Gần đúng rồi, cố lên! 🌈',
  'Không sao, làm lại nhé! 🐣',
];

export function randomPraise(): string {
  return PRAISES[Math.floor(Math.random() * PRAISES.length)];
}

export function randomEncourage(): string {
  return ENCOURAGES[Math.floor(Math.random() * ENCOURAGES.length)];
}
