import { useEffect, useRef, useState } from 'react';

import { randomEncourage, randomPraise, speak } from './speech';
import { recordResult } from './storage';

/** Một vòng câu hỏi trắc nghiệm chuẩn hóa cho luyện tập và mini game. */
export interface QuizRound {
  prompt: string;
  display?: string;
  options: string[];
  answer: string;
}

/** Tính số sao thưởng theo tỉ lệ đúng (hào phóng cho bé vui). */
export function starsFor(correct: number, total: number): number {
  if (total === 0) return 0;
  const ratio = correct / total;
  if (ratio >= 0.8) return 3;
  if (ratio >= 0.5) return 2;
  return 1;
}

/**
 * Quản lý một lượt chơi trắc nghiệm: chấm điểm, phản hồi động viên,
 * chuyển câu, kết thúc và lưu thành tích.
 */
export function useQuiz(makeRounds: () => QuizRound[], kind: 'practice' | 'game') {
  const [rounds, setRounds] = useState<QuizRound[]>(makeRounds);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ message: string; correct: boolean } | null>(null);
  const [finished, setFinished] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const round = rounds[index];
  const total = rounds.length;

  // Đọc câu hỏi cho bé nghe mỗi khi sang câu mới.
  useEffect(() => {
    if (!finished && round) speak(round.prompt);
  }, [index, finished, rounds]);

  function answer(choice: string) {
    if (selected !== null || finished || !round) return;
    const isCorrect = choice === round.answer;
    const message = isCorrect ? randomPraise() : randomEncourage();
    setSelected(choice);
    setFeedback({ message, correct: isCorrect });
    speak(message);
    const nextScore = isCorrect ? score + 1 : score;
    if (isCorrect) setScore(nextScore);

    timer.current = setTimeout(() => {
      setSelected(null);
      setFeedback(null);
      if (index + 1 >= total) {
        setFinished(true);
        recordResult({ correct: nextScore, total, stars: starsFor(nextScore, total), kind });
      } else {
        setIndex(i => i + 1);
      }
    }, 1500);
  }

  function replay() {
    if (timer.current) clearTimeout(timer.current);
    setRounds(makeRounds());
    setIndex(0);
    setScore(0);
    setSelected(null);
    setFeedback(null);
    setFinished(false);
  }

  return { round, index, total, score, selected, feedback, finished, answer, replay };
}
