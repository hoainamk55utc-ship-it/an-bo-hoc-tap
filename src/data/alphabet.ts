/**
 * Bảng chữ cái tiếng Việt (29 chữ) kèm tên đọc, từ ví dụ và emoji minh họa.
 */
export interface Letter {
  upper: string;
  lower: string;
  /** Tên gọi của chữ cái (đọc cho bé nghe). */
  name: string;
  /** Từ ví dụ bắt đầu bằng chữ cái này. */
  example: string;
  emoji: string;
}

export const ALPHABET: Letter[] = [
  { upper: 'A', lower: 'a', name: 'a', example: 'cái áo', emoji: '👕' },
  { upper: 'Ă', lower: 'ă', name: 'á', example: 'ăn cơm', emoji: '🍚' },
  { upper: 'Â', lower: 'â', name: 'ớ', example: 'ấm trà', emoji: '🫖' },
  { upper: 'B', lower: 'b', name: 'bê', example: 'quả bóng', emoji: '⚽' },
  { upper: 'C', lower: 'c', name: 'xê', example: 'con cá', emoji: '🐟' },
  { upper: 'D', lower: 'd', name: 'dê', example: 'con dê', emoji: '🐐' },
  { upper: 'Đ', lower: 'đ', name: 'đê', example: 'đồng hồ', emoji: '⏰' },
  { upper: 'E', lower: 'e', name: 'e', example: 'em bé', emoji: '👶' },
  { upper: 'Ê', lower: 'ê', name: 'ê', example: 'con ếch', emoji: '🐸' },
  { upper: 'G', lower: 'g', name: 'giê', example: 'con gà', emoji: '🐔' },
  { upper: 'H', lower: 'h', name: 'hát', example: 'bông hoa', emoji: '🌸' },
  { upper: 'I', lower: 'i', name: 'i', example: 'ỉn con', emoji: '🐷' },
  { upper: 'K', lower: 'k', name: 'ca', example: 'viên kẹo', emoji: '🍬' },
  { upper: 'L', lower: 'l', name: 'e-lờ', example: 'quả lê', emoji: '🍐' },
  { upper: 'M', lower: 'm', name: 'em-mờ', example: 'con mèo', emoji: '🐱' },
  { upper: 'N', lower: 'n', name: 'en-nờ', example: 'con nai', emoji: '🦌' },
  { upper: 'O', lower: 'o', name: 'o', example: 'con ong', emoji: '🐝' },
  { upper: 'Ô', lower: 'ô', name: 'ô', example: 'cái ô', emoji: '☂️' },
  { upper: 'Ơ', lower: 'ơ', name: 'ơ', example: 'quả ớt', emoji: '🌶️' },
  { upper: 'P', lower: 'p', name: 'pê', example: 'đèn pin', emoji: '🔦' },
  { upper: 'Q', lower: 'q', name: 'quy', example: 'quả quýt', emoji: '🍊' },
  { upper: 'R', lower: 'r', name: 'e-rờ', example: 'con rùa', emoji: '🐢' },
  { upper: 'S', lower: 's', name: 'ét-xì', example: 'ngôi sao', emoji: '⭐' },
  { upper: 'T', lower: 't', name: 'tê', example: 'quả táo', emoji: '🍎' },
  { upper: 'U', lower: 'u', name: 'u', example: 'uống nước', emoji: '🥤' },
  { upper: 'Ư', lower: 'ư', name: 'ư', example: 'ước mơ', emoji: '🌠' },
  { upper: 'V', lower: 'v', name: 'vê', example: 'con voi', emoji: '🐘' },
  { upper: 'X', lower: 'x', name: 'ích-xì', example: 'xe đạp', emoji: '🚲' },
  { upper: 'Y', lower: 'y', name: 'i dài', example: 'y tá', emoji: '👩‍⚕️' },
];
