/**
 * Écran « Résultats précédents » : liste les derniers résultats enregistrés
 * en local (AsyncStorage). Permet aussi de tout effacer.
 */
import React, { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Screen } from '@/components/Screen';
import { AppText } from '@/components/AppText';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { useLocale } from '@/context/LocaleContext';
import { useTheme } from '@/context/ThemeContext';
import { spacing } from '@/theme';
import { clearHistory, loadHistory, type HistoryEntry } from '@/utils/storage';
import { getZodiacInfo } from '@/utils/zodiac';

export default function History() {
  const { t, isRTL } = useLocale();
  const { colors } = useTheme();
  const router = useRouter();
  const [items, setItems] = useState<HistoryEntry[]>([]);

  // Recharge à chaque fois que l'écran reprend le focus.
  useFocusEffect(
    useCallback(() => {
      loadHistory().then(setItems);
    }, []),
  );

  const onClear = async () => {
    await clearHistory();
    setItems([]);
  };

  const fmtDate = (iso: string) => {
    const d = new Date(iso);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  };

  return (
    <Screen scroll>
      <View style={[styles.header, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
        <AppText variant="title" weight="800" color={colors.primary}>
          📜 {t.history.title}
        </AppText>
      </View>

      {items.length === 0 ? (
        <Card alt style={{ marginTop: spacing.lg }}>
          <AppText variant="body" center color={colors.textMuted}>
            {t.history.empty}
          </AppText>
        </Card>
      ) : (
        items.map((it, i) => (
          <Animated.View key={it.id} entering={FadeInUp.delay(i * 40)}>
            <Card style={styles.row}>
              {it.mode === 'couple' ? (
                <>
                  <View style={styles.signs}>
                    <AppText style={styles.emoji}>{getZodiacInfo(it.sign1).emoji}</AppText>
                    <AppText style={styles.heart}>💞</AppText>
                    <AppText style={styles.emoji}>{getZodiacInfo(it.sign2).emoji}</AppText>
                  </View>
                  <View style={styles.info}>
                    <AppText variant="subtitle" weight="800">
                      {it.name1} ❤ {it.name2}
                    </AppText>
                    <AppText variant="caption" color={colors.textMuted} dir="ltr">
                      {fmtDate(it.at)}
                    </AppText>
                  </View>
                  <AppText variant="title" weight="800" color={colors.success} dir="ltr">
                    {it.score}%
                  </AppText>
                </>
              ) : (
                <>
                  <AppText style={styles.emoji}>{getZodiacInfo(it.sign).emoji}</AppText>
                  <View style={styles.info}>
                    <AppText variant="subtitle" weight="800">
                      {it.name}
                    </AppText>
                    <AppText variant="caption" color={colors.textMuted}>
                      {t.signs[it.sign].name} • {fmtDate(it.at)}
                    </AppText>
                  </View>
                </>
              )}
            </Card>
          </Animated.View>
        ))
      )}

      <View style={{ gap: spacing.md, marginTop: spacing.lg }}>
        {items.length > 0 && (
          <Button label={t.history.clear} emoji="🗑️" variant="ghost" onPress={onClear} />
        )}
        <Button label={t.common.back} emoji="🏠" variant="secondary" onPress={() => router.back()} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { alignItems: 'center', justifyContent: 'center', marginTop: spacing.sm },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  signs: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  info: { flex: 1, gap: 2 },
  emoji: { fontSize: 34 },
  heart: { fontSize: 18 },
});
