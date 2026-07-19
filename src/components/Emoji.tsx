import React, { useState } from 'react';
import { Image, ImageStyle, StyleProp, Text } from 'react-native';

/**
 * Bộ hình OpenMoji (mã nguồn mở, màu sắc, đồng nhất trên mọi thiết bị) thay cho
 * emoji của hệ điều hành. Nếu tải ảnh lỗi thì tự quay về emoji hệ thống.
 */
const OPENMOJI_BASE = 'https://cdn.jsdelivr.net/gh/hfg-gmuend/openmoji@15.0.0/color/72x72';

/** Chuyển một emoji thành mã tên file OpenMoji (hex viết hoa, bỏ ký tự biến thể FE0F). */
export function openmojiCode(emoji: string): string {
  return [...emoji]
    .map(c => c.codePointAt(0)!)
    .filter(cp => cp !== 0xfe0f)
    .map(cp => cp.toString(16).toUpperCase().padStart(4, '0'))
    .join('-');
}

interface Props {
  char: string;
  size?: number;
  style?: StyleProp<ImageStyle>;
}

/** Một hình minh họa OpenMoji cho một emoji. */
export default function Emoji({ char, size = 40, style }: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <Text style={{ fontSize: size * 0.9, lineHeight: size * 1.05 }}>{char}</Text>;
  }

  return (
    <Image
      accessibilityLabel={char}
      source={{ uri: `${OPENMOJI_BASE}/${openmojiCode(char)}.png` }}
      onError={() => setFailed(true)}
      resizeMode="contain"
      style={[{ width: size, height: size }, style]}
    />
  );
}
