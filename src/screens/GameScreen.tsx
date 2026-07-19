import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';

import Emoji from '../components/Emoji';
import Header from '../components/Header';
import ScreenBackground from '../components/ScreenBackground';
import { RootStackParamList } from '../navigation/types';
import { COLORS, GRADIENTS } from '../styles/colors';
import { FONTS, RADIUS, softShadow } from '../styles/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Games'>;

const GAMES: {
  label: string;
  desc: string;
  emoji: string;
  gradient: [string, string];
  route: keyof RootStackParamList;
}[] = [
  { label: 'Tìm chữ cái đúng', desc: 'Nghe và tìm chữ cái', emoji: '🔍', gradient: GRADIENTS.blue, route: 'GameFindLetter' },
  { label: 'Tìm số còn thiếu', desc: 'Số nào biến mất rồi?', emoji: '🕵️', gradient: GRADIENTS.green, route: 'GameMissingNumber' },
  { label: 'Lật thẻ ghi nhớ', desc: 'Ghép chữ hoa với chữ thường', emoji: '🃏', gradient: GRADIENTS.purple, route: 'GameMemory' },
  { label: 'Đếm nhanh đồ vật', desc: 'Đếm và chọn số đúng', emoji: '⚡', gradient: GRADIENTS.orange, route: 'GameCountFast' },
  { label: 'Hình nào đúng chữ?', desc: 'Chọn hình bắt đầu bằng chữ', emoji: '🖼️', gradient: GRADIENTS.pink, route: 'GameFirstLetter' },
];

/** Danh sách mini game cho bé chọn. */
export default function GameScreen({ navigation }: Props) {
  return (
    <ScreenBackground>
      <View style={{ flex: 1 }}>
        <Header title="Trò chơi" emoji="🎮" />
        <ScrollView contentContainerStyle={styles.list}>
          {GAMES.map(game => (
            <Pressable
              key={game.route}
              onPress={() => navigation.navigate(game.route as never)}
              style={({ pressed }) => [
                styles.wrap,
                softShadow(game.gradient[1], 0.45),
                { transform: [{ scale: pressed ? 0.97 : 1 }] },
              ]}
            >
              <LinearGradient colors={game.gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.card}>
                <View style={styles.iconCircle}>
                  <Emoji char={game.emoji} size={34} />
                </View>
                <View style={styles.texts}>
                  <Text style={styles.label}>{game.label}</Text>
                  <Text style={styles.desc}>{game.desc}</Text>
                </View>
                <Emoji char="▶️" size={26} />
              </LinearGradient>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 16,
    gap: 14,
    paddingBottom: 32,
  },
  wrap: {
    borderRadius: RADIUS.lg,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: RADIUS.lg,
    padding: 16,
    gap: 14,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  texts: {
    flex: 1,
  },
  label: {
    fontFamily: FONTS.bodyExtra,
    fontSize: 20,
    color: COLORS.white,
  },
  desc: {
    fontFamily: FONTS.body,
    fontSize: 14,
    color: COLORS.white,
    opacity: 0.95,
  },
});
