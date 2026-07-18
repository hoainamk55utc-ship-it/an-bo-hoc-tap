import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { Letter } from '../data/alphabet';
import { CARD_COLORS, COLORS } from '../styles/colors';

interface Props {
  letter: Letter;
  index: number;
  onPress: () => void;
}

/** Thẻ chữ cái nhiều màu trong lưới bảng chữ cái. */
export default function LetterCard({ letter, index, onPress }: Props) {
  const color = CARD_COLORS[index % CARD_COLORS.length];
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: color, transform: [{ scale: pressed ? 0.92 : 1 }] },
      ]}
    >
      <Text style={styles.upper}>{letter.upper}</Text>
      <Text style={styles.lower}>{letter.lower}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 6,
    aspectRatio: 1,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  upper: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.white,
    lineHeight: 36,
  },
  lower: {
    fontSize: 22,
    color: COLORS.white,
    opacity: 0.9,
  },
});
