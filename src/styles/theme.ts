import { Platform, ViewStyle } from 'react-native';

import { COLORS } from './colors';

/**
 * Bộ font chữ tròn, thân thiện, chuyên nghiệp và hỗ trợ tiếng Việt đầy đủ.
 */
export const FONTS = {
  display: 'Baloo2_800ExtraBold',
  title: 'Baloo2_700Bold',
  heading: 'Baloo2_600SemiBold',
  bodyExtra: 'Nunito_800ExtraBold',
  bodyBold: 'Nunito_700Bold',
  body: 'Nunito_600SemiBold',
};

/** Bo góc thống nhất. */
export const RADIUS = {
  sm: 14,
  md: 20,
  lg: 28,
  xl: 36,
  pill: 999,
};

/** Bóng đổ mềm cho thẻ nổi (đa nền tảng). */
export function softShadow(color: string = COLORS.softShadow, strength = 0.35): ViewStyle {
  return Platform.select<ViewStyle>({
    web: { boxShadow: `0px 10px 24px ${hexWithAlpha(color, strength)}` } as ViewStyle,
    default: {
      shadowColor: color,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: strength,
      shadowRadius: 14,
      elevation: 6,
    },
  })!;
}

/** Bóng nhỏ hơn cho nút. */
export function buttonShadow(color: string): ViewStyle {
  return Platform.select<ViewStyle>({
    web: { boxShadow: `0px 6px 14px ${hexWithAlpha(color, 0.45)}` } as ViewStyle,
    default: {
      shadowColor: color,
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.4,
      shadowRadius: 8,
      elevation: 5,
    },
  })!;
}

/** Thêm độ trong suốt cho mã màu hex (#RRGGBB). */
export function hexWithAlpha(hex: string, alpha: number): string {
  const a = Math.round(Math.max(0, Math.min(1, alpha)) * 255)
    .toString(16)
    .padStart(2, '0');
  return `${hex}${a}`;
}
