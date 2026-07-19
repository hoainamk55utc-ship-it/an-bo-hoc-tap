import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { COLORS, GRADIENTS } from '../styles/colors';
import { FONTS, RADIUS, softShadow } from '../styles/theme';

interface Props {
  message: string;
  correct: boolean;
}

/** Băng rôn động viên nảy lên khi bé trả lời. */
export default function FeedbackBanner({ message, correct }: Props) {
  const scale = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    scale.setValue(0.3);
    Animated.spring(scale, {
      toValue: 1,
      friction: 4,
      tension: 90,
      useNativeDriver: true,
    }).start();
  }, [message, scale]);

  return (
    <Animated.View style={[styles.wrap, softShadow(correct ? COLORS.green : COLORS.red, 0.5), { transform: [{ scale }] }]}>
      <LinearGradient
        colors={correct ? GRADIENTS.green : GRADIENTS.red}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.banner}
      >
        <Text style={styles.text}>{message}</Text>
      </LinearGradient>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderRadius: RADIUS.lg,
    alignSelf: 'center',
  },
  banner: {
    paddingVertical: 14,
    paddingHorizontal: 26,
    borderRadius: RADIUS.lg,
    alignItems: 'center',
  },
  text: {
    fontFamily: FONTS.bodyExtra,
    fontSize: 22,
    color: COLORS.white,
    textAlign: 'center',
  },
});
