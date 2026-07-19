import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { CARD_GRADIENTS, COLORS } from '../styles/colors';
import { FONTS, RADIUS } from '../styles/theme';

interface Props {
  value: number;
  onPress: () => void;
  selected?: boolean;
}

/** Thẻ số nhỏ nhiều màu (dùng cho lưới chọn nhanh số). */
export default function NumberCard({ value, onPress, selected }: Props) {
  const grad = CARD_GRADIENTS[value % CARD_GRADIENTS.length];
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.wrap, selected && styles.selected, { transform: [{ scale: pressed ? 0.9 : 1 }] }]}
    >
      <LinearGradient colors={grad} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.card}>
        <Text style={styles.value}>{value}</Text>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: 56,
    height: 56,
    margin: 5,
    borderRadius: RADIUS.sm,
  },
  card: {
    flex: 1,
    borderRadius: RADIUS.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selected: {
    borderWidth: 4,
    borderColor: COLORS.text,
    borderRadius: RADIUS.sm,
  },
  value: {
    fontFamily: FONTS.display,
    fontSize: 22,
    color: COLORS.white,
  },
});
