import { StyleSheet } from 'react-native';

import { COLORS } from './colors';
import { FONTS, RADIUS, softShadow } from './theme';

/** Style dùng chung cho toàn app. */
export const globalStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 18,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    padding: 20,
    ...softShadow(),
  },
  title: {
    fontFamily: FONTS.display,
    fontSize: 30,
    color: COLORS.text,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: FONTS.body,
    fontSize: 18,
    color: COLORS.textLight,
    textAlign: 'center',
  },
});
