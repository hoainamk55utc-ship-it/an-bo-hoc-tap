import React from 'react';

import QuizPlay from '../../components/QuizPlay';
import { randInt, shuffle } from '../../utils/random';
import { QuizRound } from '../../utils/useQuiz';

const ROUNDS = 10;

/** Mỗi vòng: dãy 3 số liên tiếp bị mất một số, bé tìm số còn thiếu. */
function makeRounds(): QuizRound[] {
  return Array.from({ length: ROUNDS }, () => {
    const start = randInt(0, 97);
    const seq = [start, start + 1, start + 2];
    const missingIndex = randInt(0, 2);
    const answer = seq[missingIndex];

    const displayParts = seq.map((v, i) => (i === missingIndex ? '❓' : String(v)));
    const wrongs = new Set<number>();
    while (wrongs.size < 3) {
      const w = answer + randInt(-3, 3);
      if (w !== answer && w >= 0 && w <= 100) wrongs.add(w);
    }

    return {
      prompt: 'Số nào còn thiếu trong dãy số?',
      display: displayParts.join('   '),
      options: shuffle([answer, ...wrongs].map(String)),
      answer: String(answer),
    };
  });
}

export default function GameMissingNumberScreen() {
  return (
    <QuizPlay title="Số còn thiếu" emoji="🕵️" makeRounds={makeRounds} kind="game" bigOptions />
  );
}
