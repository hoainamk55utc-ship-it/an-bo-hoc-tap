import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';

import { COLORS } from '../styles/colors';

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
      useNativeDriver: true,
    }).start();
  }, [message, scale]);

  return (
    <Animated.View
      style={[
        styles.banner,
        { backgroundColor: correct ? COLORS.correct : COLORS.wrong, transform: [{ scale }] },
      ]}
    >
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  banner: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 24,
    alignItems: 'center',
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.white,
    textAlign: 'center',
  },
});
