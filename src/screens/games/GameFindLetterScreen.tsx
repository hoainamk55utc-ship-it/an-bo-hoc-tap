import React from 'react';

import QuizPlay from '../../components/QuizPlay';
import { ALPHABET } from '../../data/alphabet';
import { sample, shuffle } from '../../utils/random';
import { QuizRound } from '../../utils/useQuiz';

const ROUNDS = 10;

/** Mỗi vòng: nghe tên chữ cái và chọn đúng chữ trong 4 ô. */
function makeRounds(): QuizRound[] {
  return Array.from({ length: ROUNDS }, () => {
    const [target, ...distractors] = sample(ALPHABET, 4);
    return {
      prompt: `Bé hãy tìm chữ ${target.name} nhé!`,
      options: shuffle([target, ...distractors].map(l => l.upper)),
      answer: target.upper,
    };
  });
}

export default function GameFindLetterScreen() {
  return (
    <QuizPlay title="Tìm chữ cái" emoji="🔍" makeRounds={makeRounds} kind="game" bigOptions />
  );
}
