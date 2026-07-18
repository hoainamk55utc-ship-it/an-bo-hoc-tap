import React from 'react';
import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';

import { COLORS } from '../styles/colors';

interface Props {
  label: string;
  onPress: () => void;
  color?: string;
  emoji?: string;
  small?: boolean;
  style?: ViewStyle;
}

/** Nút bấm lớn, bo tròn, dành cho trẻ em. */
export default function KidButton({ label, onPress, color = COLORS.orange, emoji, small, style }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        small && styles.small,
        { backgroundColor: color, transform: [{ scale: pressed ? 0.95 : 1 }] },
        style,
      ]}
    >
      <Text style={[styles.label, small && styles.labelSmall]}>
        {emoji ? `${emoji} ` : ''}
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 18,
    paddingHorizontal: 28,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 5,
  },
  small: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  label: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.white,
    textAlign: 'center',
  },
  labelSmall: {
    fontSize: 17,
  },
});
