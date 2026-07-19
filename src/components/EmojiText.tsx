import React from 'react';
import { StyleSheet, Text, TextStyle, View } from 'react-native';

import { COLORS } from '../styles/colors';
import { FONTS } from '../styles/theme';
import Emoji from './Emoji';

const EMOJI_RE = /\p{Extended_Pictographic}(‍\p{Extended_Pictographic}|️)*/gu;

interface Props {
  text: string;
  size?: number;
  textStyle?: TextStyle;
}

/**
 * Hiển thị một chuỗi vừa có chữ vừa có emoji: phần emoji đổi thành hình OpenMoji,
 * phần chữ (số, chữ cái) giữ nguyên. Dùng cho câu đếm, dãy số còn thiếu...
 */
export default function EmojiText({ text, size = 46, textStyle }: Props) {
  const tokens: { emoji: boolean; value: string }[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  EMOJI_RE.lastIndex = 0;
  while ((m = EMOJI_RE.exec(text))) {
    if (m.index > last) tokens.push({ emoji: false, value: text.slice(last, m.index) });
    tokens.push({ emoji: true, value: m[0] });
    last = m.index + m[0].length;
  }
  if (last < text.length) tokens.push({ emoji: false, value: text.slice(last) });

  return (
    <View style={styles.row}>
      {tokens.map((tok, i) =>
        tok.emoji ? (
          <Emoji key={i} char={tok.value} size={size} style={styles.emoji} />
        ) : (
          <Text key={i} style={[{ fontFamily: FONTS.display, fontSize: size * 0.92, color: COLORS.text }, textStyle]}>
            {tok.value}
          </Text>
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    marginHorizontal: 2,
  },
});
