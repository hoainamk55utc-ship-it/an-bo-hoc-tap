import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { COLORS } from '../styles/colors';
import { globalStyles } from '../styles/global';
import { FONTS } from '../styles/theme';
import { speak } from '../utils/speech';
import Emoji from './Emoji';
import KidButton from './KidButton';

interface Props {
  correct: number;
  total: number;
  stars: number;
  onReplay: () => void;
  onHome: () => void;
}

/** Màn hình kết quả cuối mỗi lượt luyện tập / trò chơi. */
export default function ResultView({ correct, total, stars, onReplay, onHome }: Props) {
  const message =
    stars >= 3
      ? 'Bé giỏi quá! Xuất sắc lắm!'
      : stars === 2
        ? 'Bé làm tốt lắm, cố thêm chút nữa nhé!'
        : 'Bé cố lên nhé, lần sau sẽ giỏi hơn!';

  useEffect(() => {
    speak(`Bé đúng ${correct} trên ${total} câu. ${message}`);
  }, []);

  return (
    <View style={styles.container}>
      <Emoji char={stars >= 3 ? '🏆' : stars === 2 ? '🎉' : '💪'} size={110} />
      <View style={styles.starsRow}>
        {[0, 1, 2].map(i => (
          <Emoji key={i} char={i < stars ? '⭐' : '☆'} size={40} style={styles.star} />
        ))}
      </View>
      <Text style={globalStyles.title}>
        Bé đúng {correct}/{total} câu
      </Text>
      <Text style={[globalStyles.subtitle, styles.message]}>{message}</Text>
      <KidButton label="Chơi lại" emoji="🔄" color={COLORS.green} onPress={onReplay} style={styles.button} />
      <KidButton label="Về trang chủ" emoji="🏠" color={COLORS.blue} onPress={onHome} style={styles.button} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 12,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 6,
  },
  star: {
    marginHorizontal: 2,
  },
  message: {
    marginBottom: 12,
  },
  button: {
    alignSelf: 'stretch',
  },
});
