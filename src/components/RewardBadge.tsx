import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { COLORS } from '../styles/colors';

interface Props {
  emoji: string;
  label: string;
  achieved: boolean;
}

/** Huy hiệu thưởng: sáng màu khi đạt được, mờ khi chưa. */
export default function RewardBadge({ emoji, label, achieved }: Props) {
  return (
    <View style={[styles.badge, !achieved && styles.locked]}>
      <Text style={styles.emoji}>{achieved ? emoji : '🔒'}</Text>
      <Text style={[styles.label, !achieved && styles.labelLocked]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    width: '30%',
    aspectRatio: 0.9,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderWidth: 3,
    borderColor: COLORS.yellow,
  },
  locked: {
    borderColor: '#E5E0D0',
    backgroundColor: '#F6F2E4',
  },
  emoji: {
    fontSize: 40,
  },
  label: {
    marginTop: 6,
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
  },
  labelLocked: {
    color: COLORS.textLight,
  },
});
