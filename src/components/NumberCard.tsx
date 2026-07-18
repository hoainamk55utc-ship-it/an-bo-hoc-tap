import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { CARD_COLORS, COLORS } from '../styles/colors';

interface Props {
  value: number;
  onPress: () => void;
  selected?: boolean;
}

/** Thẻ số nhỏ nhiều màu (dùng cho lưới chọn nhanh số). */
export default function NumberCard({ value, onPress, selected }: Props) {
  const color = CARD_COLORS[value % CARD_COLORS.length];
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: color, transform: [{ scale: pressed ? 0.9 : 1 }] },
        selected && styles.selected,
      ]}
    >
      <Text style={styles.value}>{value}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 56,
    height: 56,
    margin: 5,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selected: {
    borderWidth: 4,
    borderColor: COLORS.text,
  },
  value: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.white,
  },
});
