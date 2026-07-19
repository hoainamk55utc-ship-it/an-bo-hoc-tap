import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { COLORS, GRADIENTS } from '../styles/colors';
import { FONTS, RADIUS, softShadow } from '../styles/theme';
import Emoji from './Emoji';

export type AnswerState = 'normal' | 'correct' | 'wrong';

interface Props {
  label: string;
  onPress: () => void;
  state?: AnswerState;
  disabled?: boolean;
  big?: boolean;
  emoji?: boolean;
}

/** Ô đáp án lớn cho bé chọn; sáng xanh (đúng) / đỏ (sai) khi trả lời. */
export default function AnswerOption({ label, onPress, state = 'normal', disabled, big, emoji }: Props) {
  const filled = state !== 'normal';
  const content = emoji ? (
    <Emoji char={label} size={big ? 54 : 42} />
  ) : (
    <Text style={[styles.label, big && styles.labelBig, filled && { color: COLORS.white }]}>{label}</Text>
  );

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.option,
        softShadow('#E3D2B4', 0.4),
        { transform: [{ scale: pressed ? 0.95 : 1 }] },
      ]}
    >
      {filled ? (
        <LinearGradient
          colors={state === 'correct' ? GRADIENTS.green : GRADIENTS.red}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.inner}
        >
          {content}
        </LinearGradient>
      ) : (
        <View style={[styles.inner, styles.normal]}>{content}</View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  option: {
    width: '47%',
    borderRadius: RADIUS.lg,
    marginBottom: 14,
  },
  inner: {
    borderRadius: RADIUS.lg,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 76,
  },
  normal: {
    backgroundColor: COLORS.white,
    borderWidth: 3,
    borderColor: '#F2EAD5',
  },
  label: {
    fontFamily: FONTS.display,
    fontSize: 30,
    color: COLORS.text,
  },
  labelBig: {
    fontSize: 46,
  },
});
