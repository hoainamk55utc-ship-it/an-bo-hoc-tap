import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import Header from '../components/Header';
import IllustrationStage from '../components/IllustrationStage';
import KidButton from '../components/KidButton';
import ScreenBackground from '../components/ScreenBackground';
import { ALPHABET } from '../data/alphabet';
import { RootStackParamList } from '../navigation/types';
import { CARD_GRADIENTS, COLORS } from '../styles/colors';
import { globalStyles } from '../styles/global';
import { FONTS, RADIUS } from '../styles/theme';
import { speak } from '../utils/speech';

type Props = NativeStackScreenProps<RootStackParamList, 'LetterDetail'>;

/** Chi tiết một chữ cái: chữ in hoa, in thường, ví dụ và phát âm. */
export default function LetterDetailScreen({ route }: Props) {
  const [index, setIndex] = useState(route.params.index);
  const letter = ALPHABET[index];

  useEffect(() => {
    speak(`Chữ ${letter.name}. Ví dụ: ${letter.example}`);
  }, [index]);

  return (
    <ScreenBackground>
      <View style={globalStyles.screen}>
        <Header title={`Chữ ${letter.upper}`} emoji="🔤" />
        <ScrollView contentContainerStyle={styles.content}>
          <View style={[globalStyles.card, styles.letterCard]}>
            <View style={styles.letterRow}>
              <View style={styles.letterBox}>
                <Text style={styles.bigLetter}>{letter.upper}</Text>
                <Text style={styles.caseLabel}>In hoa</Text>
              </View>
              <View style={styles.letterBox}>
                <Text style={styles.bigLetter}>{letter.lower}</Text>
                <Text style={styles.caseLabel}>In thường</Text>
              </View>
            </View>
            <Text style={styles.letterName}>Đọc là: “{letter.name}”</Text>
            <KidButton
              small
              label="Nghe phát âm"
              emoji="🔊"
              color={COLORS.blue}
              onPress={() => speak(`Chữ ${letter.name}`)}
            />
          </View>

          <Pressable onPress={() => speak(letter.example)} style={[globalStyles.card, styles.exampleCard]}>
            <IllustrationStage char={letter.emoji} gradient={CARD_GRADIENTS[index % CARD_GRADIENTS.length]} />
            <Text style={styles.exampleWord}>
              {letter.upper} – {letter.example}
            </Text>
            <Text style={styles.exampleHint}>Bấm vào đây để nghe 🔊</Text>
          </Pressable>

          <View style={styles.navRow}>
            <KidButton
              small
              label="Chữ trước"
              emoji="⬅️"
              color={index === 0 ? COLORS.textLight : COLORS.green}
              onPress={() => index > 0 && setIndex(index - 1)}
            />
            <Text style={styles.position}>
              {index + 1}/{ALPHABET.length}
            </Text>
            <KidButton
              small
              label="Chữ sau"
              emoji="➡️"
              color={index === ALPHABET.length - 1 ? COLORS.textLight : COLORS.green}
              onPress={() => index < ALPHABET.length - 1 && setIndex(index + 1)}
            />
          </View>
        </ScrollView>
      </View>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
    gap: 16,
    paddingBottom: 32,
  },
  letterCard: {
    alignItems: 'center',
    gap: 14,
  },
  letterRow: {
    flexDirection: 'row',
    gap: 16,
  },
  letterBox: {
    width: 120,
    height: 130,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.backgroundAlt,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: COLORS.yellow,
  },
  bigLetter: {
    fontFamily: FONTS.display,
    fontSize: 72,
    color: COLORS.text,
    lineHeight: 88,
  },
  caseLabel: {
    fontFamily: FONTS.body,
    fontSize: 14,
    color: COLORS.textLight,
  },
  letterName: {
    fontFamily: FONTS.title,
    fontSize: 22,
    color: COLORS.text,
  },
  exampleCard: {
    alignItems: 'center',
    gap: 12,
  },
  exampleWord: {
    fontFamily: FONTS.title,
    fontSize: 26,
    color: COLORS.text,
  },
  exampleHint: {
    fontFamily: FONTS.body,
    fontSize: 14,
    color: COLORS.textLight,
  },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  position: {
    fontFamily: FONTS.bodyExtra,
    fontSize: 18,
    color: COLORS.textLight,
  },
});
