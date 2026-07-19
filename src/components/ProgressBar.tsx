import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { COLORS, GRADIENTS } from '../styles/colors';
import { FONTS } from '../styles/theme';

interface Props {
  current: number;
  total: number;
}

/** Thanh tiến độ vui nhộn: Câu 3/10. */
export default function ProgressBar({ current, total }: Props) {
  const percent = total > 0 ? Math.min(100, (current / total) * 100) : 0;
  return (
    <View style={styles.wrapper}>
      <View style={styles.track}>
        <LinearGradient
          colors={GRADIENTS.green}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.fill, { width: `${percent}%` }]}
        />
      </View>
      <Text style={styles.label}>
        {current}/{total}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  track: {
    flex: 1,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#EEE6D2',
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 9,
    minWidth: 18,
  },
  label: {
    fontFamily: FONTS.bodyExtra,
    fontSize: 16,
    color: COLORS.textLight,
  },
});
