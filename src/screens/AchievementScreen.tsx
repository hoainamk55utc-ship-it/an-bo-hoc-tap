import React, { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import Emoji from '../components/Emoji';
import Header from '../components/Header';
import KidButton from '../components/KidButton';
import RewardBadge from '../components/RewardBadge';
import ScreenBackground from '../components/ScreenBackground';
import { RootStackParamList } from '../navigation/types';
import { COLORS } from '../styles/colors';
import { globalStyles } from '../styles/global';
import { FONTS } from '../styles/theme';
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

const STATS: { emoji: string; label: string; value: (a: Achievements) => number }[] = [
  { emoji: '⭐', label: 'Sao thưởng', value: a => a.stars },
  { emoji: '✅', label: 'Câu đúng', value: a => a.correct },
  { emoji: '✏️', label: 'Lượt luyện tập', value: a => a.practiceRounds },
  { emoji: '🎮', label: 'Lượt chơi game', value: a => a.gamesPlayed },
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
    <ScreenBackground>
      <View style={globalStyles.screen}>
        <Header title="Thành tích của bé" emoji="🏆" />
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.statGrid}>
            {STATS.map(stat => (
              <View key={stat.label} style={[globalStyles.card, styles.statCard]}>
                <Emoji char={stat.emoji} size={34} />
                <Text style={styles.statValue}>{stat.value(data)}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.sectionTitle}>
            Huy hiệu của bé ({badgeCount}/{BADGES.length})
          </Text>
          <View style={styles.badgeGrid}>
            {BADGES.map(badge => (
              <RewardBadge key={badge.label} emoji={badge.emoji} label={badge.label} achieved={badge.check(data)} />
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
            color={confirmReset ? COLORS.red : COLORS.textLight}
            onPress={onReset}
          />
        </ScrollView>
      </View>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
    gap: 14,
    paddingBottom: 32,
  },
  statGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 14,
  },
  statCard: {
    width: '47%',
    alignItems: 'center',
    paddingVertical: 16,
    gap: 2,
  },
  statValue: {
    fontFamily: FONTS.display,
    fontSize: 32,
    color: COLORS.orange,
  },
  statLabel: {
    fontFamily: FONTS.body,
    fontSize: 14,
    color: COLORS.textLight,
  },
  sectionTitle: {
    fontFamily: FONTS.title,
    fontSize: 20,
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
    fontFamily: FONTS.body,
    fontSize: 16,
    color: COLORS.textLight,
    textAlign: 'center',
  },
});
