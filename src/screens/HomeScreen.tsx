import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { RootStackParamList } from '../navigation/types';
import { COLORS } from '../styles/colors';
import { globalStyles } from '../styles/global';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const MODULES: {
  label: string;
  emoji: string;
  color: string;
  route: keyof RootStackParamList;
}[] = [
  { label: 'Học chữ cái', emoji: '🔤', color: COLORS.blue, route: 'Alphabet' },
  { label: 'Học số', emoji: '🔢', color: COLORS.green, route: 'Numbers' },
  { label: 'Luyện tập', emoji: '✏️', color: COLORS.orange, route: 'Practice' },
  { label: 'Trò chơi', emoji: '🎮', color: COLORS.purple, route: 'Games' },
  { label: 'Thành tích của bé', emoji: '🏆', color: COLORS.pink, route: 'Achievements' },
];

/** Trang chủ: lưới các mục học lớn, nhiều màu. */
export default function HomeScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View style={globalStyles.screen}>
      <ScrollView contentContainerStyle={[styles.content, { paddingTop: insets.top + 16 }]}>
        <Text style={styles.hello}>Chào bé! 👋</Text>
        <Text style={styles.appName}>AN BƠ HỌC TẬP</Text>
        <View style={styles.grid}>
          {MODULES.map(module => (
            <Pressable
              key={module.route}
              onPress={() => navigation.navigate(module.route as never)}
              style={({ pressed }) => [
                styles.moduleCard,
                { backgroundColor: module.color, transform: [{ scale: pressed ? 0.95 : 1 }] },
                module.route === 'Achievements' && styles.fullWidth,
              ]}
            >
              <Text style={styles.moduleEmoji}>{module.emoji}</Text>
              <Text style={styles.moduleLabel}>{module.label}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  hello: {
    fontSize: 22,
    color: COLORS.textLight,
    textAlign: 'center',
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.orange,
    textAlign: 'center',
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  moduleCard: {
    width: '48%',
    aspectRatio: 1.05,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    padding: 12,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 4,
  },
  fullWidth: {
    width: '100%',
    aspectRatio: 2.6,
  },
  moduleEmoji: {
    fontSize: 52,
  },
  moduleLabel: {
    marginTop: 8,
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white,
    textAlign: 'center',
  },
});
