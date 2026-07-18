import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { COLORS } from '../styles/colors';
import { globalStyles } from '../styles/global';
import { speak } from '../utils/speech';

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
          style={({ pressed }) => [styles.speakButton, pressed && { opacity: 0.7 }]}
        >
          <Text style={styles.speakIcon}>🔊</Text>
        </Pressable>
      </View>
      {display ? <Text style={styles.display}>{display}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
  },
  promptRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  prompt: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  speakButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: COLORS.blue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  speakIcon: {
    fontSize: 22,
  },
  display: {
    marginTop: 14,
    fontSize: 52,
    textAlign: 'center',
    color: COLORS.text,
    fontWeight: 'bold',
  },
});
