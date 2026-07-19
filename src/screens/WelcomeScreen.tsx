import React, { useEffect } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import Emoji from '../components/Emoji';
import KidButton from '../components/KidButton';
import ScreenBackground from '../components/ScreenBackground';
import { RootStackParamList } from '../navigation/types';
import { COLORS } from '../styles/colors';
import { FONTS } from '../styles/theme';
import { speak } from '../utils/speech';

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

const GREETING = 'Chào mừng An Bơ Học Tập, chúc An Bơ học tập tốt nhé';

/** Màn hình chào mừng với tên app và nút bắt đầu. */
export default function WelcomeScreen({ navigation }: Props) {
  useEffect(() => {
    // Trên điện thoại: đọc lời chào ngay khi mở.
    if (Platform.OS !== 'web') {
      speak(GREETING);
      return;
    }
    // Trên web: trình duyệt chặn phát tiếng trước khi người dùng chạm,
    // nên đọc lời chào ngay lần chạm/bấm đầu tiên.
    let greeted = false;
    const greet = () => {
      if (greeted) return;
      greeted = true;
      speak(GREETING);
      remove();
    };
    const remove = () => {
      window.removeEventListener('pointerdown', greet);
      window.removeEventListener('keydown', greet);
    };
    window.addEventListener('pointerdown', greet);
    window.addEventListener('keydown', greet);
    return remove;
  }, []);

  return (
    <ScreenBackground>
      <View style={styles.container}>
        <View style={styles.hero}>
          <Emoji char="🐣" size={72} style={styles.heroItem} />
          <Emoji char="📚" size={64} style={styles.heroItem} />
          <Emoji char="✨" size={56} style={styles.heroItem} />
        </View>
        <Text style={styles.appName}>AN BƠ{'\n'}HỌC TẬP</Text>
        <Text style={styles.slogan}>Bé vui học chữ và số mỗi ngày! 🌈</Text>
        <KidButton
          label="Bắt đầu học"
          emoji="🚀"
          color={COLORS.orange}
          onPress={() => navigation.replace('Home')}
          style={styles.startButton}
        />
      </View>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  hero: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 18,
  },
  heroItem: {
    marginHorizontal: 2,
  },
  appName: {
    fontFamily: FONTS.display,
    fontSize: 50,
    color: COLORS.orange,
    textAlign: 'center',
    lineHeight: 58,
  },
  slogan: {
    fontFamily: FONTS.body,
    fontSize: 19,
    color: COLORS.textLight,
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 40,
  },
  startButton: {
    alignSelf: 'stretch',
    marginHorizontal: 18,
  },
});
