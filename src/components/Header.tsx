import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { COLORS } from '../styles/colors';
import { buttonShadow, FONTS } from '../styles/theme';
import Emoji from './Emoji';

interface Props {
  title: string;
  emoji?: string;
}

/** Thanh tiêu đề có nút quay lại tròn to. */
export default function Header({ title, emoji }: Props) {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 10 }]}>
      {navigation.canGoBack() ? (
        <Pressable
          onPress={() => navigation.goBack()}
          style={({ pressed }) => [styles.backButton, buttonShadow(COLORS.yellow), pressed && { opacity: 0.8, transform: [{ scale: 0.94 }] }]}
        >
          <Text style={styles.backText}>‹</Text>
        </Pressable>
      ) : (
        <View style={styles.spacer} />
      )}
      <View style={styles.titleRow}>
        {emoji ? <Emoji char={emoji} size={26} /> : null}
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
      </View>
      <View style={styles.spacer} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingBottom: 10,
  },
  backButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: COLORS.yellow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backText: {
    fontFamily: FONTS.display,
    fontSize: 34,
    lineHeight: 40,
    color: COLORS.white,
    marginTop: -4,
  },
  spacer: {
    width: 46,
    height: 46,
  },
  titleRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  title: {
    fontFamily: FONTS.title,
    fontSize: 24,
    color: COLORS.text,
    textAlign: 'center',
  },
});
