import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import KidButton from '../components/KidButton';
import { RootStackParamList } from '../navigation/types';
import { COLORS } from '../styles/colors';
import { globalStyles } from '../styles/global';
import { speak } from '../utils/speech';

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

/** Màn hình chào mừng với tên app và nút bắt đầu. */
export default function WelcomeScreen({ navigation }: Props) {
  useEffect(() => {
    speak('Chào mừng bé đến với An Bơ học tập!');
  }, []);

  return (
    <View style={[globalStyles.screen, styles.container]}>
      <Text style={styles.illustration}>🐥📚✨</Text>
      <Text style={styles.appName}>AN BƠ{'\n'}HỌC TẬP</Text>
      <Text style={styles.slogan}>Bé vui học chữ và số mỗi ngày! 🌈</Text>
      <KidButton
        label="Bắt đầu học"
        emoji="🚀"
        color={COLORS.orange}
        onPress={() => {
          speak('Bắt đầu học nào!');
          navigation.replace('Home');
        }}
        style={styles.startButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  illustration: {
    fontSize: 64,
    marginBottom: 16,
  },
  appName: {
    fontSize: 48,
    fontWeight: 'bold',
    color: COLORS.orange,
    textAlign: 'center',
    lineHeight: 58,
  },
  slogan: {
    fontSize: 20,
    color: COLORS.textLight,
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 40,
  },
  startButton: {
    alignSelf: 'stretch',
    marginHorizontal: 20,
  },
});
