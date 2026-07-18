import React, { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import Header from '../components/Header';
import KidButton from '../components/KidButton';
import RewardBadge from '../components/RewardBadge';
import { RootStackParamList } from '../navigation/types';
import { COLORS } from '../styles/colors';
import { globalStyles } from '../styles/global';
import { speak } from '../utils/speech';
import { Achievements, EMPTY_ACHIEVEMENTS, loadAchievements, resetAchievements } from '../utils/storage';

type Props = NativeStackScreenProps<RootStackParamList, 'Achievements'>;

const BADGES: { emoji: string; label: string; check: (a: Achievements) => boolean }[] = [
  { emoji: '🐥', label: 'Khởi đầu', check: a => a.correct >= 1 },
  { emoji: '🌟', label: 'Ngôi sao nhỏ', check: a => a.stars >= 10 },
  { emoji: '🏅', label: 'Bé chăm chỉ', check: a => a.practiceRounds >= 5 },
  { emoji: '🧠', label: 'Siêu trí nhớ', check: a => a.gamesPlayed >= 3 },
  { emoji: '🏆', label: 'Nhà vô địch', check: a => a.correct >= 50 },
  { emoji: '🎓', label: 'Sẵn sàng lớp 1', check: a => a.stars >= 100 },
];

/** Thành tích của bé: sao, số câu đúng, huy hiệu. */
export default function AchievementScreen(_props: Props) {
  const [data, setData] = useState<Achievements>(EMPTY_ACHIEVEMENTS);
  const [confirmReset, setConfirmReset] = useState(false);

  useFocusEffect(
    useCallback(() => {
      loadAchievements().then(setData);
    }, [])
  );

  const badgeCount = BADGES.filter(b => b.check(data)).length;

  async function onReset() {
    if (!confirmReset) {
      setConfirmReset(true);
      return;
    }
    await resetAchievements();
    setData({ ...EMPTY_ACHIEVEMENTS });
    setConfirmReset(false);
    speak('Đã bắt đầu lại từ đầu. Bé cố gắng nhé!');
  }

  return (
    <View style={globalStyles.screen}>
      <Header title="Thành tích của bé" emoji="🏆" />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.statRow}>
          <View style={[globalStyles.card, styles.statCard]}>
            <Text style={styles.statEmoji}>⭐</Text>
            <Text style={styles.statValue}>{data.stars}</Text>
            <Text style={styles.statLabel}>Sao thưởng</Text>
          </View>
          <View style={[globalStyles.card, styles.statCard]}>
            <Text style={styles.statEmoji}>✅</Text>
            <Text style={styles.statValue}>{data.correct}</Text>
            <Text style={styles.statLabel}>Câu đúng</Text>
          </View>
        </View>
        <View style={styles.statRow}>
          <View style={[globalStyles.card, styles.statCard]}>
            <Text style={styles.statEmoji}>✏️</Text>
            <Text style={styles.statValue}>{data.practiceRounds}</Text>
            <Text style={styles.statLabel}>Lượt luyện tập</Text>
          </View>
          <View style={[globalStyles.card, styles.statCard]}>
            <Text style={styles.statEmoji}>🎮</Text>
            <Text style={styles.statValue}>{data.gamesPlayed}</Text>
            <Text style={styles.statLabel}>Lượt chơi game</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>
          Huy hiệu của bé ({badgeCount}/{BADGES.length})
        </Text>
        <View style={styles.badgeGrid}>
          {BADGES.map(badge => (
            <RewardBadge
              key={badge.label}
              emoji={badge.emoji}
              label={badge.label}
              achieved={badge.check(data)}
            />
          ))}
        </View>

        <Text style={styles.cheer}>
          {data.correct === 0
            ? 'Bé hãy luyện tập để nhận sao và huy hiệu nhé! 💪'
            : 'Bé giỏi lắm, tiếp tục cố gắng nhé! 🥳'}
        </Text>

        <KidButton
          small
          label={confirmReset ? 'Bấm lần nữa để xóa hết' : 'Bắt đầu lại từ đầu'}
          emoji="🗑️"
          color={confirmReset ? COLORS.wrong : COLORS.textLight}
          onPress={onReset}
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
  statRow: {
    flexDirection: 'row',
    gap: 14,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
  },
  statEmoji: {
    fontSize: 34,
  },
  statValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.orange,
  },
  statLabel: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
    marginTop: 6,
  },
  badgeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 12,
  },
  cheer: {
    fontSize: 16,
    color: COLORS.textLight,
    textAlign: 'center',
  },
});
