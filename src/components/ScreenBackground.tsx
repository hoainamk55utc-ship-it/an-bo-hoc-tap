import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { SCREEN_GRADIENT } from '../styles/colors';

/** Nền gradient dịu dùng chung cho mọi màn hình. */
export default function ScreenBackground({ children }: { children: React.ReactNode }) {
  return (
    <View style={styles.root}>
      <LinearGradient colors={SCREEN_GRADIENT} style={StyleSheet.absoluteFill} />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
