import React from 'react';
import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { COLORS, GRADIENT_FOR, GRADIENTS } from '../styles/colors';
import { buttonShadow, FONTS, RADIUS } from '../styles/theme';
import Emoji from './Emoji';

interface Props {
  label: string;
  onPress: () => void;
  color?: string;
  gradient?: [string, string];
  emoji?: string;
  small?: boolean;
  style?: ViewStyle;
}

/** Nút bấm lớn, bo tròn, gradient, đổ bóng mềm — dành cho trẻ em. */
export default function KidButton({ label, onPress, color = COLORS.orange, gradient, emoji, small, style }: Props) {
  const grad = gradient ?? GRADIENT_FOR[color] ?? GRADIENTS.orange;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.wrapper,
        buttonShadow(grad[1]),
        { transform: [{ scale: pressed ? 0.96 : 1 }] },
        style,
      ]}
    >
      <LinearGradient
        colors={grad}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.button, small && styles.small]}
      >
        <View style={styles.row}>
          {emoji ? <Emoji char={emoji} size={small ? 20 : 24} /> : null}
          <Text style={[styles.label, small && styles.labelSmall]}>{label}</Text>
        </View>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: RADIUS.pill,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 26,
    borderRadius: RADIUS.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  small: {
    paddingVertical: 12,
    paddingHorizontal: 18,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  label: {
    fontFamily: FONTS.bodyExtra,
    fontSize: 20,
    color: COLORS.white,
    textAlign: 'center',
  },
  labelSmall: {
    fontSize: 16,
  },
});
