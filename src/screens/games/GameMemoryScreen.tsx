import React, { useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import Header from '../../components/Header';
import ResultView from '../../components/ResultView';
import { ALPHABET, Letter } from '../../data/alphabet';
import { RootStackParamList } from '../../navigation/types';
import { CARD_COLORS, COLORS } from '../../styles/colors';
import { globalStyles } from '../../styles/global';
import { sample, shuffle } from '../../utils/random';
import { randomPraise, speak } from '../../utils/speech';
import { recordResult } from '../../utils/storage';

type Props = NativeStackScreenProps<RootStackParamList, 'GameMemory'>;

const PAIRS = 6;

interface MemoryCard {
  key: string;
  letter: Letter;
  face: 'upper' | 'lower';
}

/** Tạo 12 thẻ: 6 chữ cái, mỗi chữ một thẻ in hoa + một thẻ in thường. */
function makeCards(): MemoryCard[] {
  const letters = sample(ALPHABET, PAIRS);
  const cards = letters.flatMap<MemoryCard>(letter => [
    { key: `${letter.upper}-U`, letter, face: 'upper' },
    { key: `${letter.upper}-L`, letter, face: 'lower' },
  ]);
  return shuffle(cards);
}

/** Trò lật thẻ ghi nhớ: ghép chữ in hoa với chữ in thường. */
export default function GameMemoryScreen({ navigation }: Props) {
  const [cards, setCards] = useState<MemoryCard[]>(makeCards);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [finished, setFinished] = useState(false);
  const lockRef = useRef(false);

  const stars = moves <= 9 ? 3 : moves <= 13 ? 2 : 1;

  function onCardPress(index: number) {
    const card = cards[index];
    if (lockRef.current || finished) return;
    if (flipped.includes(index) || matched.includes(card.letter.upper)) return;

    const nextFlipped = [...flipped, index];
    setFlipped(nextFlipped);
    if (nextFlipped.length < 2) return;

    setMoves(m => m + 1);
    const [a, b] = nextFlipped.map(i => cards[i]);
    if (a.letter.upper === b.letter.upper) {
      const praise = randomPraise();
      speak(`${a.letter.upper} và ${a.letter.lower}. ${praise}`);
      const nextMatched = [...matched, a.letter.upper];
      setMatched(nextMatched);
      setFlipped([]);
      if (nextMatched.length === PAIRS) {
        setFinished(true);
        const finalMoves = moves + 1;
        const finalStars = finalMoves <= 9 ? 3 : finalMoves <= 13 ? 2 : 1;
        recordResult({ correct: PAIRS, total: PAIRS, stars: finalStars, kind: 'game' });
      }
    } else {
      lockRef.current = true;
      setTimeout(() => {
        setFlipped([]);
        lockRef.current = false;
      }, 900);
    }
  }

  function replay() {
    setCards(makeCards());
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setFinished(false);
    lockRef.current = false;
  }

  if (finished) {
    return (
      <View style={globalStyles.screen}>
        <Header title="Lật thẻ ghi nhớ" emoji="🃏" />
        <ResultView
          correct={PAIRS}
          total={PAIRS}
          stars={stars}
          onReplay={replay}
          onHome={() => navigation.navigate('Home')}
        />
      </View>
    );
  }

  return (
    <View style={globalStyles.screen}>
      <Header title="Lật thẻ ghi nhớ" emoji="🃏" />
      <Text style={styles.hint}>Ghép chữ IN HOA với chữ in thường nhé!</Text>
      <Text style={styles.moves}>Số lượt lật: {moves}</Text>
      <View style={styles.grid}>
        {cards.map((card, index) => {
          const isUp = flipped.includes(index) || matched.includes(card.letter.upper);
          const isMatched = matched.includes(card.letter.upper);
          const color = CARD_COLORS[ALPHABET.indexOf(card.letter) % CARD_COLORS.length];
          return (
            <Pressable
              key={card.key}
              onPress={() => onCardPress(index)}
              style={({ pressed }) => [
                styles.card,
                { backgroundColor: isUp ? color : COLORS.yellow },
                isMatched && styles.matched,
                pressed && !isUp && { transform: [{ scale: 0.93 }] },
              ]}
            >
              <Text style={[styles.cardText, !isUp && styles.cardBack]}>
                {isUp ? (card.face === 'upper' ? card.letter.upper : card.letter.lower) : '❓'}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hint: {
    fontSize: 16,
    color: COLORS.textLight,
    textAlign: 'center',
  },
  moves: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
    marginVertical: 6,
  },
  grid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
    padding: 10,
  },
  card: {
    width: '28%',
    aspectRatio: 0.85,
    margin: '1.5%',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 3,
  },
  matched: {
    opacity: 0.6,
  },
  cardText: {
    fontSize: 44,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  cardBack: {
    fontSize: 34,
  },
});
