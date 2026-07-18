import React from 'react';

import QuizPlay from '../components/QuizPlay';
import { QUESTIONS } from '../data/questions';
import { shuffle } from '../utils/random';
import { QuizRound } from '../utils/useQuiz';

const ROUND_SIZE = 10;

/** Mỗi lượt luyện tập lấy 10 câu ngẫu nhiên từ bộ câu hỏi, trộn đáp án. */
function makeRounds(): QuizRound[] {
  return shuffle(QUESTIONS)
    .slice(0, ROUND_SIZE)
    .map(q => ({
      prompt: q.prompt,
      display: q.display,
      options: shuffle(q.options),
      answer: q.answer,
    }));
}

export default function PracticeScreen() {
  return <QuizPlay title="Luyện tập" emoji="✏️" makeRounds={makeRounds} kind="practice" />;
}
