import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import Header from '../components/Header';
import LetterCard from '../components/LetterCard';
import { ALPHABET } from '../data/alphabet';
import { RootStackParamList } from '../navigation/types';
import { COLORS } from '../styles/colors';
import { globalStyles } from '../styles/global';

type Props = NativeStackScreenProps<RootStackParamList, 'Alphabet'>;

/** Bảng chữ cái tiếng Việt dạng lưới 4 cột. */
export default function AlphabetScreen({ navigation }: Props) {
  return (
    <View style={globalStyles.screen}>
      <Header title="Bảng chữ cái" emoji="🔤" />
      <Text style={styles.hint}>Bé bấm vào chữ để học nhé! 👇</Text>
      <FlatList
        data={ALPHABET}
        numColumns={4}
        keyExtractor={item => item.upper}
        contentContainerStyle={styles.grid}
        renderItem={({ item, index }) => (
          <LetterCard
            letter={item}
            index={index}
            onPress={() => navigation.navigate('LetterDetail', { index })}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  hint: {
    fontSize: 16,
    color: COLORS.textLight,
    textAlign: 'center',
    marginBottom: 6,
  },
  grid: {
    paddingHorizontal: 10,
    paddingBottom: 24,
  },
});
