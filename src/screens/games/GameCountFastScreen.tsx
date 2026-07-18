import React from 'react';

import QuizPlay from '../../components/QuizPlay';
import { COUNT_EMOJIS } from '../../data/numbers';
import { randInt, shuffle } from '../../utils/random';
import { QuizRound } from '../../utils/useQuiz';

const ROUNDS = 10;

/** Mỗi vòng: đếm thật nhanh số đồ vật trên màn hình và chọn số đúng. */
function makeRounds(): QuizRound[] {
  return Array.from({ length: ROUNDS }, () => {
    const count = randInt(1, 10);
    const emoji = COUNT_EMOJIS[randInt(0, COUNT_EMOJIS.length - 1)];
    const wrongs = new Set<number>();
    while (wrongs.size < 3) {
      const w = count + randInt(-2, 2);
      if (w !== count && w >= 1 && w <= 12) wrongs.add(w);
    }
    return {
      prompt: 'Có bao nhiêu đồ vật trên màn hình?',
      display: emoji.repeat(count),
      options: shuffle([count, ...wrongs].map(String)),
      answer: String(count),
    };
  });
}

export default function GameCountFastScreen() {
  return (
    <QuizPlay title="Đếm nhanh" emoji="⚡" makeRounds={makeRounds} kind="game" bigOptions />
  );
}
