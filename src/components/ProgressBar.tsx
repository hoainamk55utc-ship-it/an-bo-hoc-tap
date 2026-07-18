import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { COLORS } from '../styles/colors';

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
        <View style={[styles.fill, { width: `${percent}%` }]} />
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
    height: 16,
    borderRadius: 8,
    backgroundColor: '#EFE6C8',
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 8,
    backgroundColor: COLORS.green,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textLight,
  },
});
