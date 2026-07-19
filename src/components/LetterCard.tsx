import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { Letter } from '../data/alphabet';
import { CARD_GRADIENTS, COLORS } from '../styles/colors';
import { FONTS, RADIUS, softShadow } from '../styles/theme';

interface Props {
  letter: Letter;
  index: number;
  onPress: () => void;
}

/** Thẻ chữ cái gradient nhiều màu trong lưới bảng chữ cái. */
export default function LetterCard({ letter, index, onPress }: Props) {
  const grad = CARD_GRADIENTS[index % CARD_GRADIENTS.length];
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.wrap, softShadow(grad[1], 0.4), { transform: [{ scale: pressed ? 0.92 : 1 }] }]}
    >
      <LinearGradient colors={grad} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.card}>
        <Text style={styles.upper}>{letter.upper}</Text>
        <Text style={styles.lower}>{letter.lower}</Text>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    margin: 6,
    borderRadius: RADIUS.md,
  },
  card: {
    aspectRatio: 1,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  upper: {
    fontFamily: FONTS.display,
    fontSize: 32,
    color: COLORS.white,
    lineHeight: 40,
  },
  lower: {
    fontFamily: FONTS.title,
    fontSize: 20,
    color: COLORS.white,
    opacity: 0.92,
  },
});
