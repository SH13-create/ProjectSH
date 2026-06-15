/**
 * Écran d'accueil (Onboarding) : logo/nom, message de bienvenue,
 * choix de l'écriture, et choix du mode (individuel / couple).
 */
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Screen } from '@/components/Screen';
import { AppText } from '@/components/AppText';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Toggles } from '@/components/Toggles';
import { SeerAvatar } from '@/components/SeerAvatar';
import { useLocale } from '@/context/LocaleContext';
import { useTheme } from '@/context/ThemeContext';
import { useQuiz } from '@/context/QuizContext';
import { radius, softShadow, spacing } from '@/theme';
import type { Mode } from '@/utils/questions';
import { dailyPick } from '@/utils/oracle';
import { shareText } from '@/utils/share';

export default function Home() {
  const { t } = useLocale();
  const { colors } = useTheme();
  const { setMode } = useQuiz();
  const router = useRouter();

  // Aperçu du jour (teaser) : stable toute la journée, change chaque jour.
  const word = dailyPick(t.daily.wordPool, new Date(), 'word');

  // Accueil chaleureux selon l'heure (rend l'app vivante).
  const hour = new Date().getHours();
  const greeting =
    hour < 12
      ? t.daily.greetMorning
      : hour < 17
        ? t.daily.greetAfternoon
        : hour < 21
          ? t.daily.greetEvening
          : t.daily.greetNight;

  // Divulgation progressive : on cache les autres modes derrière un bouton.
  const [showMore, setShowMore] = useState(false);

  const start = (mode: Mode) => {
    setMode(mode);
    router.push('/quiz');
  };

  return (
    <Screen scroll>
      <Toggles />

      <Animated.View entering={FadeInDown.duration(500)} style={styles.hero}>
        <View style={styles.avatar}>
          <SeerAvatar size={150} />
        </View>
        <AppText variant="display" center weight="800" color={colors.primary}>
          {t.common.appName}
        </AppText>
        <AppText variant="subtitle" center color={colors.textMuted} style={{ marginTop: spacing.xs }}>
          {t.common.tagline}
        </AppText>
      </Animated.View>

      <Animated.View entering={FadeInUp.delay(120).duration(500)}>
        <AppText variant="body" center weight="700" color={colors.secondary} style={{ marginBottom: spacing.sm }}>
          {greeting}
        </AppText>
      </Animated.View>

      <Animated.View entering={FadeInUp.delay(150).duration(500)}>
        <Card alt>
          <AppText variant="body" center>
            {t.onboarding.welcome}
          </AppText>
        </Card>
      </Animated.View>

      {/* 🌅 Aperçu du jour : un seul teaser (le détail est dans le mode quotidien) */}
      <Animated.View entering={FadeInUp.delay(220).duration(500)}>
        <DailyCard icon="🌙" label={t.daily.wordLabel} text={word} accent={colors.secondary} />
      </Animated.View>

      {/* 🚀 Action principale : un seul gros bouton vers le mode quotidien guidé */}
      <Animated.View entering={FadeInUp.delay(400).duration(500)} style={{ marginTop: spacing.lg }}>
        <Button label={t.daily.dailyCta} emoji="🔮" onPress={() => router.push('/daily')} />
      </Animated.View>

      {/* Divulgation progressive : le reste est caché derrière un lien */}
      {!showMore ? (
        <Button
          label={t.onboarding.moreOptions}
          emoji="✨"
          variant="ghost"
          onPress={() => setShowMore(true)}
          style={{ marginTop: spacing.sm }}
        />
      ) : (
        <Animated.View entering={FadeInUp.duration(400)} style={{ gap: spacing.sm, marginTop: spacing.sm }}>
          <Button label={t.onboarding.soloTitle} emoji="🌟" variant="secondary" onPress={() => start('solo')} />
          <Button label={t.onboarding.coupleTitle} emoji="💑" variant="secondary" onPress={() => start('couple')} />
          <Button label={t.voice.talk} emoji="🎙️" variant="secondary" onPress={() => router.push('/voice')} />
          <Button label={t.photo.mode} emoji="📸" variant="secondary" onPress={() => router.push('/photo')} />
          <Button label={t.history.open} emoji="📜" variant="ghost" onPress={() => router.push('/history')} />
        </Animated.View>
      )}

      {/* Liens légers toujours visibles : partager + à propos */}
      <View style={styles.footerLinks}>
        <Button label={t.share.button} emoji="🔗" variant="ghost" onPress={() => shareText(t.share.message)} style={{ flex: 1 }} />
      </View>
      <Button label={t.about.open} emoji="ℹ️" variant="ghost" onPress={() => router.push('/about')} style={{ marginTop: spacing.xs }} />
    </Screen>
  );
}

/** Carte « du jour » (conseil / mot de Moulat Niya). */
function DailyCard({
  icon,
  label,
  text,
  accent,
  muted,
}: {
  icon: string;
  label: string;
  text: string;
  accent: string;
  muted?: boolean;
}) {
  const { colors } = useTheme();
  return (
    <View
      style={[
        styles.daily,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderLeftColor: accent,
        },
        softShadow(colors.shadow),
      ]}
    >
      <AppText variant="caption" weight="800" color={accent}>
        {icon} {label}
      </AppText>
      <AppText
        variant={muted ? 'body' : 'subtitle'}
        weight={muted ? '600' : '700'}
        color={colors.text}
        style={{ marginTop: spacing.xs }}
      >
        {text}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: { marginTop: spacing.lg, marginBottom: spacing.sm },
  avatar: { alignItems: 'center', marginBottom: spacing.sm },
  footerLinks: { flexDirection: 'row', marginTop: spacing.md },
  daily: {
    borderRadius: radius.md,
    borderWidth: 1,
    borderLeftWidth: 4,
    padding: spacing.md,
    marginTop: spacing.sm,
  },
});
