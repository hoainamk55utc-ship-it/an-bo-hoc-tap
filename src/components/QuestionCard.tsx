import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { COLORS } from '../styles/colors';
import { globalStyles } from '../styles/global';
import { FONTS } from '../styles/theme';
import { speak } from '../utils/speech';
import Emoji from './Emoji';
import EmojiText from './EmojiText';

interface Props {
  prompt: string;
  display?: string;
}

/** Thẻ câu hỏi: câu hỏi + nội dung minh họa lớn + nút nghe lại. */
export default function QuestionCard({ prompt, display }: Props) {
  return (
    <View style={[globalStyles.card, styles.card]}>
      <View style={styles.promptRow}>
        <Text style={styles.prompt}>{prompt}</Text>
        <Pressable
          onPress={() => speak(prompt)}
          style={({ pressed }) => [styles.speakButton, pressed && { opacity: 0.75, transform: [{ scale: 0.94 }] }]}
        >
          <Emoji char="🔊" size={24} />
        </Pressable>
      </View>
      {display ? (
        <View style={styles.displayBox}>
          <EmojiText text={display} size={46} />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    gap: 6,
  },
  promptRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  prompt: {
    flex: 1,
    fontFamily: FONTS.bodyExtra,
    fontSize: 20,
    color: COLORS.text,
  },
  speakButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#EAF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  displayBox: {
    marginTop: 10,
    paddingVertical: 6,
  },
});
