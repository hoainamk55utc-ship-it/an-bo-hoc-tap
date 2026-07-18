import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import Header from '../components/Header';
import { RootStackParamList } from '../navigation/types';
import { COLORS } from '../styles/colors';
import { globalStyles } from '../styles/global';

type Props = NativeStackScreenProps<RootStackParamList, 'Games'>;

const GAMES: {
  label: string;
  desc: string;
  emoji: string;
  color: string;
  route: keyof RootStackParamList;
}[] = [
  { label: 'Tìm chữ cái đúng', desc: 'Nghe và tìm chữ cái', emoji: '🔍', color: COLORS.blue, route: 'GameFindLetter' },
  { label: 'Tìm số còn thiếu', desc: 'Số nào biến mất rồi?', emoji: '🕵️', color: COLORS.green, route: 'GameMissingNumber' },
  { label: 'Lật thẻ ghi nhớ', desc: 'Ghép chữ hoa với chữ thường', emoji: '🃏', color: COLORS.purple, route: 'GameMemory' },
  { label: 'Đếm nhanh đồ vật', desc: 'Đếm và chọn số đúng', emoji: '⚡', color: COLORS.orange, route: 'GameCountFast' },
  { label: 'Hình nào đúng chữ?', desc: 'Chọn hình bắt đầu bằng chữ', emoji: '🖼️', color: COLORS.pink, route: 'GameFirstLetter' },
];

/** Danh sách mini game cho bé chọn. */
export default function GameScreen({ navigation }: Props) {
  return (
    <View style={globalStyles.screen}>
      <Header title="Trò chơi" emoji="🎮" />
      <ScrollView contentContainerStyle={styles.list}>
        {GAMES.map(game => (
          <Pressable
            key={game.route}
            onPress={() => navigation.navigate(game.route as never)}
            style={({ pressed }) => [
              styles.gameCard,
              { backgroundColor: game.color, transform: [{ scale: pressed ? 0.96 : 1 }] },
            ]}
          >
            <Text style={styles.gameEmoji}>{game.emoji}</Text>
            <View style={styles.gameTexts}>
              <Text style={styles.gameLabel}>{game.label}</Text>
              <Text style={styles.gameDesc}>{game.desc}</Text>
            </View>
            <Text style={styles.play}>▶️</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 16,
    gap: 14,
    paddingBottom: 32,
  },
  gameCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 26,
    padding: 18,
    gap: 14,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 4,
  },
  gameEmoji: {
    fontSize: 44,
  },
  gameTexts: {
    flex: 1,
  },
  gameLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  gameDesc: {
    fontSize: 15,
    color: COLORS.white,
    opacity: 0.9,
  },
  play: {
    fontSize: 26,
  },
});
