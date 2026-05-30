/**
 * Flux de questions : une question par écran, barre de progression,
 * composants adaptés (texte / date / choix / cartes). À la dernière
 * question, on part vers l'écran de calcul.
 */
import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeIn, FadeOut, SlideInRight } from 'react-native-reanimated';
import { Screen } from '@/components/Screen';
import { AppText } from '@/components/AppText';
import { Button } from '@/components/Button';
import { ChoiceCard } from '@/components/ChoiceCard';
import { DateField } from '@/components/DateField';
import { ProgressBar } from '@/components/ProgressBar';
import { useLocale } from '@/context/LocaleContext';
import { useTheme } from '@/context/ThemeContext';
import { useQuiz } from '@/context/QuizContext';
import { radius, softShadow, spacing } from '@/theme';
import { getQuestions } from '@/utils/questions';
import { format } from '@/locales';

export default function Quiz() {
  const { t, isRTL } = useLocale();
  const { colors } = useTheme();
  const { mode, answers, setAnswer } = useQuiz();
  const router = useRouter();

  const questions = getQuestions(mode);
  const [index, setIndex] = useState(0);
  const q = questions[index];
  const current = answers[q.key] ?? '';
  const total = questions.length;

  const canNext = q.type === 'text' ? current.trim().length > 0 : current.length > 0;

  const goNext = () => {
    if (!canNext) return;
    if (index + 1 < total) {
      setIndex(index + 1);
    } else {
      router.replace('/loading');
    }
  };

  const goBack = () => {
    if (index === 0) router.back();
    else setIndex(index - 1);
  };

  // Pour les choix : on enregistre puis on avance tout seul (UX plus fluide).
  const selectAndAdvance = (value: string) => {
    setAnswer(q.key, value);
    setTimeout(() => {
      if (index + 1 < total) setIndex(index + 1);
      else router.replace('/loading');
    }, 260);
  };

  return (
    <Screen scroll>
      {/* En-tête : progression + compteur */}
      <View style={styles.header}>
        <AppText variant="caption" weight="700" color={colors.textMuted}>
          {format(t.quiz.progress, { current: index + 1, total })}
        </AppText>
        <ProgressBar progress={(index + 1) / total} />
      </View>

      <Animated.View
        key={q.key}
        entering={SlideInRight.duration(300)}
        exiting={FadeOut.duration(120)}
        style={styles.body}
      >
        <AppText variant="title" weight="800" style={{ marginVertical: spacing.lg }}>
          {q.title(t)}
        </AppText>

        {/* --- Champ texte --- */}
        {q.type === 'text' && (
          <TextInput
            value={current}
            onChangeText={(v) => setAnswer(q.key, v)}
            placeholder={q.placeholder?.(t)}
            placeholderTextColor={colors.textMuted}
            style={[
              styles.input,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                color: colors.text,
                textAlign: isRTL ? 'right' : 'left',
                writingDirection: isRTL ? 'rtl' : 'ltr',
              },
              softShadow(colors.shadow),
            ]}
            returnKeyType="done"
            onSubmitEditing={goNext}
          />
        )}

        {/* --- Date --- */}
        {q.type === 'date' && (
          <DateField value={current || undefined} onChange={(iso) => setAnswer(q.key, iso)} />
        )}

        {/* --- Choix simple (liste verticale) --- */}
        {q.type === 'single' && (
          <View style={styles.list}>
            {q.options!.map((opt) => (
              <ChoiceCard
                key={opt.value}
                label={opt.label(t)}
                emoji={opt.emoji}
                selected={current === opt.value}
                onPress={() => selectAndAdvance(opt.value)}
                layout="row"
              />
            ))}
          </View>
        )}

        {/* --- Cartes illustrées (grille 2 colonnes) --- */}
        {q.type === 'cards' && (
          <View style={styles.grid}>
            {q.options!.map((opt) => (
              <ChoiceCard
                key={opt.value}
                label={opt.label(t)}
                emoji={opt.emoji}
                selected={current === opt.value}
                onPress={() => selectAndAdvance(opt.value)}
                layout="grid"
              />
            ))}
          </View>
        )}
      </Animated.View>

      {/* Navigation bas d'écran */}
      <Animated.View entering={FadeIn} style={styles.nav}>
        <Button label={t.common.back} variant="ghost" onPress={goBack} style={{ flex: 1 }} />
        {(q.type === 'text' || q.type === 'date') && (
          <Button label={t.common.next} onPress={goNext} disabled={!canNext} style={{ flex: 1 }} />
        )}
      </Animated.View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { gap: spacing.sm },
  body: { flex: 1 },
  input: {
    minHeight: 64,
    borderRadius: radius.md,
    borderWidth: 1.5,
    paddingHorizontal: spacing.lg,
    fontSize: 20,
    fontWeight: '600',
  },
  list: { gap: spacing.sm },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: spacing.md },
  nav: { flexDirection: 'row', gap: spacing.md, marginTop: spacing.lg },
});
