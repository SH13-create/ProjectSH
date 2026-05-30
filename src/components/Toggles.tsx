/**
 * Petits sélecteurs en haut de l'écran :
 *  - bascule de l'écriture de la darija (arabe ⇄ arabizi)
 *  - bascule du thème clair / sombre
 */
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useLocale } from '@/context/LocaleContext';
import { useTheme } from '@/context/ThemeContext';
import { radius, spacing } from '@/theme';
import { AppText } from './AppText';

function Pill({ onPress, children }: { onPress: () => void; children: React.ReactNode }) {
  const { colors } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={[styles.pill, { backgroundColor: colors.surface, borderColor: colors.border }]}
    >
      {children}
    </Pressable>
  );
}

export function Toggles() {
  const { colors, isDark, toggleTheme } = useTheme();
  const { t, toggleScript } = useLocale();

  return (
    <View style={styles.row}>
      <Pill onPress={toggleScript}>
        <AppText weight="700" color={colors.secondary}>🌐 {t.onboarding.scriptSwitch}</AppText>
      </Pill>
      <Pill onPress={toggleTheme}>
        <AppText weight="700">{isDark ? '☀️' : '🌙'}</AppText>
      </Pill>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', gap: spacing.sm },
  pill: {
    borderRadius: radius.pill,
    borderWidth: 1,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
});
