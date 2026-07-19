/**
 * Hệ màu pastel tươi sáng, hài hòa, thân thiện với trẻ em.
 * Kèm các cặp màu gradient cho thẻ bài và nền.
 */
export const COLORS = {
  // Nền
  background: '#FFF6E9',
  backgroundAlt: '#FFEFDD',
  card: '#FFFFFF',

  // Màu nhấn
  orange: '#FF8A5C',
  yellow: '#FFC93C',
  green: '#57C785',
  blue: '#4D96FF',
  pink: '#FF6FA5',
  purple: '#A66CFF',
  teal: '#3FC7C0',
  red: '#FF6B6B',

  // Chữ
  text: '#3A3A5C',
  textLight: '#8E8EB0',
  white: '#FFFFFF',

  // Trạng thái
  correct: '#57C785',
  wrong: '#FF6B6B',

  // Bóng đổ
  shadow: '#C9B79A',
  softShadow: '#E2B98F',
};

/** Cặp màu gradient cho từng tông (đậm → nhạt cùng tông). */
export const GRADIENTS: Record<string, [string, string]> = {
  orange: ['#FFB65C', '#FF7A45'],
  yellow: ['#FFDD6B', '#FFB93C'],
  green: ['#7CE0A0', '#3FB871'],
  blue: ['#6FB4FF', '#3D7EFF'],
  pink: ['#FF9AC0', '#FF5C95'],
  purple: ['#C29AFF', '#8E56FF'],
  teal: ['#66DDD6', '#28B7AF'],
  red: ['#FF9A9A', '#FF5C5C'],
  cream: ['#FFF9EE', '#FFEFD8'],
  sky: ['#FFF3E0', '#FFE6F0'],
};

/** Nền gradient dịu cho toàn màn hình. */
export const SCREEN_GRADIENT: [string, string, string] = ['#FFF7EC', '#FFF0F5', '#F2F6FF'];

/** Màu xoay vòng cho các thẻ chữ cái / số cho sinh động. */
export const CARD_COLORS = [
  COLORS.blue,
  COLORS.green,
  COLORS.orange,
  COLORS.pink,
  COLORS.purple,
  COLORS.teal,
];

/** Cặp gradient xoay vòng cho lưới chữ cái. */
export const CARD_GRADIENTS: [string, string][] = [
  GRADIENTS.blue,
  GRADIENTS.green,
  GRADIENTS.orange,
  GRADIENTS.pink,
  GRADIENTS.purple,
  GRADIENTS.teal,
];

/** Tra cứu cặp gradient từ một màu nền đơn. */
export const GRADIENT_FOR: Record<string, [string, string]> = {
  [COLORS.orange]: GRADIENTS.orange,
  [COLORS.yellow]: GRADIENTS.yellow,
  [COLORS.green]: GRADIENTS.green,
  [COLORS.blue]: GRADIENTS.blue,
  [COLORS.pink]: GRADIENTS.pink,
  [COLORS.purple]: GRADIENTS.purple,
  [COLORS.teal]: GRADIENTS.teal,
  [COLORS.red]: GRADIENTS.red,
  [COLORS.textLight]: ['#B9B9D4', '#9797B6'],
};
