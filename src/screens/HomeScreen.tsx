import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Emoji from '../components/Emoji';
import ScreenBackground from '../components/ScreenBackground';
import { RootStackParamList } from '../navigation/types';
import { COLORS, GRADIENTS } from '../styles/colors';
import { FONTS, RADIUS, softShadow } from '../styles/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const MODULES: {
  label: string;
  emoji: string;
  gradient: [string, string];
  route: keyof RootStackParamList;
}[] = [
  { label: 'Học chữ cái', emoji: '🔤', gradient: GRADIENTS.blue, route: 'Alphabet' },
  { label: 'Học số', emoji: '🔢', gradient: GRADIENTS.green, route: 'Numbers' },
  { label: 'Luyện tập', emoji: '✏️', gradient: GRADIENTS.orange, route: 'Practice' },
  { label: 'Trò chơi', emoji: '🎮', gradient: GRADIENTS.purple, route: 'Games' },
  { label: 'Thành tích của bé', emoji: '🏆', gradient: GRADIENTS.pink, route: 'Achievements' },
];

/** Trang chủ: lưới các mục học lớn, nhiều màu. */
export default function HomeScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <ScreenBackground>
      <ScrollView contentContainerStyle={[styles.content, { paddingTop: insets.top + 18 }]}>
        <Text style={styles.hello}>Chào bé! 👋</Text>
        <Text style={styles.appName}>AN BƠ HỌC TẬP</Text>
        <View style={styles.grid}>
          {MODULES.map(module => (
            <Pressable
              key={module.route}
              onPress={() => navigation.navigate(module.route as never)}
              style={({ pressed }) => [
                styles.cardWrap,
                module.route === 'Achievements' && styles.fullWidth,
                softShadow(module.gradient[1], 0.45),
                { transform: [{ scale: pressed ? 0.95 : 1 }] },
              ]}
            >
              <LinearGradient
                colors={module.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[styles.card, module.route === 'Achievements' && styles.cardWide]}
              >
                <Emoji char={module.emoji} size={module.route === 'Achievements' ? 52 : 56} />
                <Text style={styles.label}>{module.label}</Text>
              </LinearGradient>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  hello: {
    fontFamily: FONTS.body,
    fontSize: 22,
    color: COLORS.textLight,
    textAlign: 'center',
  },
  appName: {
    fontFamily: FONTS.display,
    fontSize: 34,
    color: COLORS.orange,
    textAlign: 'center',
    marginBottom: 22,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardWrap: {
    width: '48%',
    marginBottom: 16,
    borderRadius: RADIUS.lg,
  },
  fullWidth: {
    width: '100%',
  },
  card: {
    aspectRatio: 1.05,
    borderRadius: RADIUS.lg,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    gap: 8,
  },
  cardWide: {
    aspectRatio: 2.8,
    flexDirection: 'row',
    gap: 14,
  },
  label: {
    fontFamily: FONTS.bodyExtra,
    fontSize: 20,
    color: COLORS.white,
    textAlign: 'center',
  },
});
