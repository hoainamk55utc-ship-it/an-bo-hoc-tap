import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { COLORS } from '../styles/colors';
import { FONTS, RADIUS, softShadow } from '../styles/theme';
import Emoji from './Emoji';

interface Props {
  emoji: string;
  label: string;
  achieved: boolean;
}

/** Huy hiệu thưởng: sáng màu khi đạt được, mờ khi chưa. */
export default function RewardBadge({ emoji, label, achieved }: Props) {
  return (
    <View style={[styles.badge, achieved ? softShadow('#F0C97A', 0.5) : undefined, !achieved && styles.locked]}>
      <Emoji char={achieved ? emoji : '🔒'} size={44} />
      <Text style={[styles.label, !achieved && styles.labelLocked]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    width: '30%',
    aspectRatio: 0.86,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    gap: 6,
    borderWidth: 3,
    borderColor: COLORS.yellow,
  },
  locked: {
    borderColor: '#E7E1D0',
    backgroundColor: '#F7F3E7',
  },
  label: {
    fontFamily: FONTS.bodyBold,
    fontSize: 13,
    color: COLORS.text,
    textAlign: 'center',
  },
  labelLocked: {
    color: COLORS.textLight,
  },
});
