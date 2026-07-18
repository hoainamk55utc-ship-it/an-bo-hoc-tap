import * as Speech from 'expo-speech';

/** Đọc to một câu tiếng Việt cho bé nghe (bỏ emoji trước khi đọc). */
export function speak(text: string) {
  const clean = text.replace(/[\p{Extended_Pictographic}\u{FE0F}]/gu, '').trim();
  if (!clean) return;
  Speech.stop();
  Speech.speak(clean, { language: 'vi-VN', rate: 0.85, pitch: 1.1 });
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
