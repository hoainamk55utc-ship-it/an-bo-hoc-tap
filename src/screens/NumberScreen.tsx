import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import Header from '../components/Header';
import KidButton from '../components/KidButton';
import { emojiForNumber, numberName } from '../data/numbers';
import { RootStackParamList } from '../navigation/types';
import { COLORS } from '../styles/colors';
import { globalStyles } from '../styles/global';
import { randInt } from '../utils/random';
import { speak } from '../utils/speech';

type Props = NativeStackScreenProps<RootStackParamList, 'Numbers'>;

/** Học số 0–100: số lớn, tên số, minh họa số lượng bằng emoji. */
export default function NumberScreen(_props: Props) {
  const [n, setN] = useState(1);
  const emoji = emojiForNumber(n);

  useEffect(() => {
    speak(`Số ${numberName(n)}`);
  }, [n]);

  return (
    <View style={globalStyles.screen}>
      <Header title="Học số 0 – 100" emoji="🔢" />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={[globalStyles.card, styles.numberCard]}>
          <Text style={styles.bigNumber}>{n}</Text>
          <Text style={styles.numberName}>{numberName(n)}</Text>
          <KidButton
            small
            label="Nghe đọc số"
            emoji="🔊"
            color={COLORS.blue}
            onPress={() => speak(`Số ${numberName(n)}`)}
          />
        </View>

        <View style={[globalStyles.card, styles.countCard]}>
          {n === 0 ? (
            <Text style={styles.zeroText}>Không có gì cả! 🤷</Text>
          ) : n <= 20 ? (
            <Text style={styles.emojiWrap}>{emoji.repeat(n)}</Text>
          ) : (
            <View style={styles.bigCount}>
              <Text style={styles.bigCountEmoji}>{emoji}</Text>
              <Text style={styles.bigCountText}>× {n}</Text>
            </View>
          )}
          <Text style={styles.countHint}>
            {n === 0 ? 'Số 0 nghĩa là không có gì' : `Đếm cùng bé: ${n} ${emoji}`}
          </Text>
        </View>

        <View style={styles.navRow}>
          <KidButton
            small
            label="Trước"
            emoji="⬅️"
            color={n === 0 ? COLORS.textLight : COLORS.green}
            onPress={() => n > 0 && setN(n - 1)}
          />
          <KidButton
            small
            label="Sau"
            emoji="➡️"
            color={n === 100 ? COLORS.textLight : COLORS.green}
            onPress={() => n < 100 && setN(n + 1)}
          />
        </View>
        <View style={styles.navRow}>
          <KidButton small label="Lùi 10" emoji="⏪" color={COLORS.purple} onPress={() => setN(Math.max(0, n - 10))} />
          <KidButton small label="Tiến 10" emoji="⏩" color={COLORS.purple} onPress={() => setN(Math.min(100, n + 10))} />
        </View>
        <KidButton
          label="Số bất kỳ"
          emoji="🎲"
          color={COLORS.pink}
          onPress={() => setN(randInt(0, 100))}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
    gap: 14,
    paddingBottom: 32,
  },
  numberCard: {
    alignItems: 'center',
    gap: 8,
  },
  bigNumber: {
    fontSize: 96,
    fontWeight: 'bold',
    color: COLORS.orange,
    lineHeight: 104,
  },
  numberName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: COLORS.text,
    textTransform: 'capitalize',
  },
  countCard: {
    alignItems: 'center',
    gap: 10,
    minHeight: 120,
    justifyContent: 'center',
  },
  emojiWrap: {
    fontSize: 30,
    textAlign: 'center',
    lineHeight: 40,
  },
  zeroText: {
    fontSize: 24,
    color: COLORS.textLight,
  },
  bigCount: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  bigCountEmoji: {
    fontSize: 56,
  },
  bigCountText: {
    fontSize: 44,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  countHint: {
    fontSize: 16,
    color: COLORS.textLight,
  },
  navRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
