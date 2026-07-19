import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from '../navigation/types';
import { globalStyles } from '../styles/global';
import { QuizRound, starsFor, useQuiz } from '../utils/useQuiz';
import AnswerOption, { AnswerState } from './AnswerOption';
import FeedbackBanner from './FeedbackBanner';
import Header from './Header';
import ProgressBar from './ProgressBar';
import QuestionCard from './QuestionCard';
import ResultView from './ResultView';
import ScreenBackground from './ScreenBackground';

interface Props {
  title: string;
  emoji: string;
  makeRounds: () => QuizRound[];
  kind: 'practice' | 'game';
  /** Hiển thị đáp án cỡ chữ to (cho chữ cái, số). */
  bigOptions?: boolean;
  /** Đáp án là emoji → hiển thị bằng hình OpenMoji. */
  emojiOptions?: boolean;
}

/** Màn chơi trắc nghiệm dùng chung cho luyện tập và các mini game. */
export default function QuizPlay({ title, emoji, makeRounds, kind, bigOptions, emojiOptions }: Props) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const quiz = useQuiz(makeRounds, kind);

  if (quiz.finished) {
    return (
      <ScreenBackground>
        <View style={globalStyles.screen}>
          <Header title={title} emoji={emoji} />
          <ResultView
            correct={quiz.score}
            total={quiz.total}
            stars={starsFor(quiz.score, quiz.total)}
            onReplay={quiz.replay}
            onHome={() => navigation.navigate('Home')}
          />
        </View>
      </ScreenBackground>
    );
  }

  if (!quiz.round) return null;

  function stateFor(option: string): AnswerState {
    if (quiz.selected === null) return 'normal';
    if (option === quiz.round!.answer) return 'correct';
    if (option === quiz.selected) return 'wrong';
    return 'normal';
  }

  return (
    <ScreenBackground>
      <View style={globalStyles.screen}>
        <Header title={title} emoji={emoji} />
        <View style={[globalStyles.content, styles.body]}>
          <ProgressBar current={quiz.index + 1} total={quiz.total} />
          <QuestionCard prompt={quiz.round.prompt} display={quiz.round.display} />
          <View style={styles.options}>
            {quiz.round.options.map(option => (
              <AnswerOption
                key={option}
                label={option}
                big={bigOptions}
                emoji={emojiOptions}
                state={stateFor(option)}
                disabled={quiz.selected !== null}
                onPress={() => quiz.answer(option)}
              />
            ))}
          </View>
          <View style={styles.feedbackArea}>
            {quiz.feedback && (
              <FeedbackBanner message={quiz.feedback.message} correct={quiz.feedback.correct} />
            )}
          </View>
        </View>
      </View>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  body: {
    gap: 16,
    paddingTop: 8,
  },
  options: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  feedbackArea: {
    minHeight: 70,
    justifyContent: 'center',
  },
});
