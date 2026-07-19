import React from 'react';

import QuizPlay from '../../components/QuizPlay';
import { ALPHABET } from '../../data/alphabet';
import { sample, shuffle } from '../../utils/random';
import { QuizRound } from '../../utils/useQuiz';

const ROUNDS = 10;

/** Mỗi vòng: hiện một chữ cái, bé chọn hình có tên bắt đầu bằng chữ đó. */
function makeRounds(): QuizRound[] {
  return Array.from({ length: ROUNDS }, () => {
    const [target, ...distractors] = sample(ALPHABET, 4);
    return {
      prompt: `Hình nào bắt đầu bằng chữ ${target.name}? (${target.example})`,
      display: target.upper,
      options: shuffle([target, ...distractors].map(l => l.emoji)),
      answer: target.emoji,
    };
  });
}

export default function GameFirstLetterScreen() {
  return (
    <QuizPlay title="Hình và chữ" emoji="🖼️" makeRounds={makeRounds} kind="game" emojiOptions />
  );
}
