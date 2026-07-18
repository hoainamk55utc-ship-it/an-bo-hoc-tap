import AsyncStorage from '@react-native-async-storage/async-storage';

/** Thành tích của bé, lưu cục bộ trên máy. */
export interface Achievements {
  stars: number;
  correct: number;
  answered: number;
  practiceRounds: number;
  gamesPlayed: number;
}

const KEY = 'anbo_achievements_v1';

export const EMPTY_ACHIEVEMENTS: Achievements = {
  stars: 0,
  correct: 0,
  answered: 0,
  practiceRounds: 0,
  gamesPlayed: 0,
};

export async function loadAchievements(): Promise<Achievements> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    if (!raw) return { ...EMPTY_ACHIEVEMENTS };
    return { ...EMPTY_ACHIEVEMENTS, ...JSON.parse(raw) };
  } catch {
    return { ...EMPTY_ACHIEVEMENTS };
  }
}

async function save(data: Achievements) {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    // Lưu thất bại thì bỏ qua, không làm gián đoạn việc học của bé.
  }
}

/** Ghi nhận kết quả một lượt luyện tập / trò chơi. */
export async function recordResult(opts: {
  correct: number;
  total: number;
  stars: number;
  kind: 'practice' | 'game';
}): Promise<Achievements> {
  const data = await loadAchievements();
  data.correct += opts.correct;
  data.answered += opts.total;
  data.stars += opts.stars;
  if (opts.kind === 'practice') data.practiceRounds += 1;
  else data.gamesPlayed += 1;
  await save(data);
  return data;
}

export async function resetAchievements() {
  await save({ ...EMPTY_ACHIEVEMENTS });
}
