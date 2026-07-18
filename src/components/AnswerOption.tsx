import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { COLORS } from '../styles/colors';

export type AnswerState = 'normal' | 'correct' | 'wrong';

interface Props {
  label: string;
  onPress: () => void;
  state?: AnswerState;
  disabled?: boolean;
  big?: boolean;
}

/** Ô đáp án lớn cho bé chọn; đổi màu xanh/đỏ khi trả lời. */
export default function AnswerOption({ label, onPress, state = 'normal', disabled, big }: Props) {
  const background =
    state === 'correct' ? COLORS.correct : state === 'wrong' ? COLORS.wrong : COLORS.white;
  const color = state === 'normal' ? COLORS.text : COLORS.white;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.option,
        { backgroundColor: background, transform: [{ scale: pressed ? 0.94 : 1 }] },
      ]}
    >
      <Text style={[styles.label, big && styles.labelBig, { color }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  option: {
    width: '47%',
    paddingVertical: 20,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#F0E8CE',
    marginBottom: 12,
  },
  label: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  labelBig: {
    fontSize: 44,
  },
});
