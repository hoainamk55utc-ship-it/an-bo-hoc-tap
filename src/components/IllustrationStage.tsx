import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { GRADIENTS } from '../styles/colors';
import { softShadow } from '../styles/theme';
import Emoji from './Emoji';

interface Props {
  char: string;
  size?: number;
  emojiSize?: number;
  gradient?: [string, string];
}

/** Khung tròn gradient dịu làm "sân khấu" cho một hình minh họa lớn. */
export default function IllustrationStage({ char, size = 130, emojiSize = 82, gradient = GRADIENTS.sky }: Props) {
  return (
    <View style={[styles.shadow, { borderRadius: size / 2 }, softShadow('#E7C9A6', 0.5)]}>
      <LinearGradient
        colors={gradient}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 0.9, y: 1 }}
        style={[styles.stage, { width: size, height: size, borderRadius: size / 2 }]}
      >
        <Emoji char={char} size={emojiSize} />
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  shadow: {
    alignSelf: 'center',
  },
  stage: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 5,
    borderColor: '#FFFFFF',
  },
});
