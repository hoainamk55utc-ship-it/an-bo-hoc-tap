/**
 * Bộ câu hỏi luyện tập cho bé (24 câu, trộn nhiều dạng).
 */
export type QuestionType =
  | 'letter' // chọn đúng chữ cái được hỏi
  | 'number' // chọn đúng số được hỏi
  | 'letter-image' // nhìn hình, chọn chữ cái bắt đầu
  | 'count' // đếm đồ vật, chọn số đúng
  | 'case'; // nhận diện chữ in hoa - in thường

export interface Question {
  id: number;
  type: QuestionType;
  /** Câu hỏi (được đọc to cho bé nghe). */
  prompt: string;
  /** Nội dung hiển thị lớn: emoji hoặc chữ cái. */
  display?: string;
  options: string[];
  answer: string;
}

export const QUESTIONS: Question[] = [
  // --- Chọn đúng chữ cái ---
  { id: 1, type: 'letter', prompt: 'Bé hãy tìm chữ Bê nhé!', options: ['B', 'D', 'P', 'H'], answer: 'B' },
  { id: 2, type: 'letter', prompt: 'Chữ nào là chữ A?', options: ['E', 'A', 'O', 'U'], answer: 'A' },
  { id: 3, type: 'letter', prompt: 'Bé hãy tìm chữ Em-mờ nhé!', options: ['N', 'W', 'M', 'H'], answer: 'M' },
  { id: 4, type: 'letter', prompt: 'Chữ nào là chữ Ô, giống cái ô che mưa?', options: ['O', 'Ơ', 'Ô', 'A'], answer: 'Ô' },
  { id: 5, type: 'letter', prompt: 'Bé hãy tìm chữ Đê có gạch ngang nhé!', options: ['D', 'Đ', 'B', 'P'], answer: 'Đ' },
  // --- Chọn đúng số ---
  { id: 6, type: 'number', prompt: 'Bé hãy chọn số Năm nhé!', options: ['2', '5', '8', '3'], answer: '5' },
  { id: 7, type: 'number', prompt: 'Số nào là số Mười?', options: ['10', '01', '11', '100'], answer: '10' },
  { id: 8, type: 'number', prompt: 'Bé hãy chọn số Bảy nhé!', options: ['1', '4', '9', '7'], answer: '7' },
  { id: 9, type: 'number', prompt: 'Số nào là số Hai mươi?', options: ['12', '20', '22', '2'], answer: '20' },
  { id: 10, type: 'number', prompt: 'Bé hãy chọn số Không nhé!', options: ['0', '8', '6', '9'], answer: '0' },
  // --- Nhìn hình chọn chữ cái ---
  { id: 11, type: 'letter-image', prompt: 'Con cá bắt đầu bằng chữ gì?', display: '🐟', options: ['C', 'M', 'B', 'H'], answer: 'C' },
  { id: 12, type: 'letter-image', prompt: 'Con gà bắt đầu bằng chữ gì?', display: '🐔', options: ['H', 'G', 'K', 'L'], answer: 'G' },
  { id: 13, type: 'letter-image', prompt: 'Con mèo bắt đầu bằng chữ gì?', display: '🐱', options: ['N', 'V', 'M', 'C'], answer: 'M' },
  { id: 14, type: 'letter-image', prompt: 'Con voi bắt đầu bằng chữ gì?', display: '🐘', options: ['V', 'X', 'D', 'T'], answer: 'V' },
  { id: 15, type: 'letter-image', prompt: 'Quả táo bắt đầu bằng chữ gì?', display: '🍎', options: ['C', 'T', 'Q', 'S'], answer: 'T' },
  { id: 16, type: 'letter-image', prompt: 'Bông hoa bắt đầu bằng chữ gì?', display: '🌸', options: ['H', 'B', 'N', 'M'], answer: 'H' },
  // --- Đếm đồ vật ---
  { id: 17, type: 'count', prompt: 'Có bao nhiêu quả táo?', display: '🍎🍎🍎', options: ['2', '3', '4', '5'], answer: '3' },
  { id: 18, type: 'count', prompt: 'Có bao nhiêu ngôi sao?', display: '⭐⭐⭐⭐⭐', options: ['4', '6', '5', '3'], answer: '5' },
  { id: 19, type: 'count', prompt: 'Có bao nhiêu quả bóng?', display: '⚽⚽', options: ['1', '2', '3', '4'], answer: '2' },
  { id: 20, type: 'count', prompt: 'Có bao nhiêu con cá?', display: '🐟🐟🐟🐟🐟🐟🐟', options: ['6', '8', '7', '5'], answer: '7' },
  { id: 21, type: 'count', prompt: 'Có bao nhiêu quả chuối?', display: '🍌🍌🍌🍌', options: ['4', '3', '5', '6'], answer: '4' },
  // --- Chữ in hoa và in thường ---
  { id: 22, type: 'case', prompt: 'Chữ in thường của chữ A là chữ nào?', display: 'A', options: ['e', 'a', 'o', 'u'], answer: 'a' },
  { id: 23, type: 'case', prompt: 'Chữ in hoa của chữ bê là chữ nào?', display: 'b', options: ['D', 'P', 'B', 'R'], answer: 'B' },
  { id: 24, type: 'case', prompt: 'Chữ in thường của chữ Em-mờ là chữ nào?', display: 'M', options: ['n', 'm', 'w', 'h'], answer: 'm' },
];
