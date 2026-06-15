/**
 * Écran d'accueil (Onboarding) : logo/nom, message de bienvenue,
 * choix de l'écriture, et choix du mode (individuel / couple).
 */
import React from 'react';
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

  // Contenu quotidien : stable toute la journée, change chaque jour.
  const now = new Date();
  const advice = dailyPick(t.daily.advicePool, now, 'advice');
  const word = dailyPick(t.daily.wordPool, now, 'word');
  const quote = dailyPick(t.daily.quotePool, now, 'quote');
  const joke = dailyPick(t.daily.jokePool, now, 'joke');

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

      {/* 🌅 Contenu du jour : donne envie de revenir chaque jour */}
      <AppText variant="subtitle" weight="800" center color={colors.primary} style={{ marginTop: spacing.md }}>
        ✨ {t.daily.sectionTitle}
      </AppText>
      <Animated.View entering={FadeInUp.delay(200).duration(500)}>
        <DailyCard icon="🌙" label={t.daily.wordLabel} text={word} accent={colors.secondary} />
      </Animated.View>
      <Animated.View entering={FadeInUp.delay(240).duration(500)}>
        <DailyCard icon="🌟" label={t.daily.adviceLabel} text={advice} accent={colors.accent} />
      </Animated.View>
      <Animated.View entering={FadeInUp.delay(280).duration(500)}>
        <DailyCard icon="💬" label={t.daily.quoteLabel} text={quote} accent={colors.success} muted />
      </Animated.View>
      <Animated.View entering={FadeInUp.delay(320).duration(500)}>
        <DailyCard icon="😄" label={t.daily.jokeLabel} text={joke} accent={colors.primary} muted />
      </Animated.View>
      <Animated.View entering={FadeInUp.delay(360).duration(500)}>
        <AppText variant="caption" center color={colors.textMuted} style={{ marginTop: spacing.xs }}>
          {t.daily.comeback}
        </AppText>
      </Animated.View>

      <AppText variant="subtitle" weight="800" center style={{ marginTop: spacing.lg }}>
        {t.onboarding.chooseMode}
      </AppText>

      <Animated.View entering={FadeInUp.delay(300).duration(500)} style={styles.modes}>
        <ModeCard
          emoji="🌟"
          title={t.onboarding.soloTitle}
          desc={t.onboarding.soloDesc}
          cta={t.common.start}
          onPress={() => start('solo')}
        />
        <ModeCard
          emoji="💑"
          title={t.onboarding.coupleTitle}
          desc={t.onboarding.coupleDesc}
          cta={t.common.start}
          onPress={() => start('couple')}
        />
      </Animated.View>

      <Button
        label={t.voice.talk}
        emoji="🎙️"
        onPress={() => router.push('/voice')}
        style={{ marginTop: spacing.sm }}
      />

      <Button
        label={t.photo.mode}
        emoji="📸"
        variant="secondary"
        onPress={() => router.push('/photo')}
        style={{ marginTop: spacing.sm }}
      />

      <Button
        label={t.history.open}
        emoji="📜"
        variant="ghost"
        onPress={() => router.push('/history')}
        style={{ marginTop: spacing.sm }}
      />

      <Button
        label={t.share.button}
        emoji="🔗"
        variant="ghost"
        onPress={() => shareText(t.share.message)}
        style={{ marginTop: spacing.sm }}
      />

      <Button
        label={t.about.open}
        emoji="ℹ️"
        variant="ghost"
        onPress={() => router.push('/about')}
        style={{ marginTop: spacing.sm }}
      />
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

function ModeCard({
  emoji,
  title,
  desc,
  cta,
  onPress,
}: {
  emoji: string;
  title: string;
  desc: string;
  cta: string;
  onPress: () => void;
}) {
  const { colors } = useTheme();
  return (
    <Card style={styles.modeCard}>
      <View style={styles.modeRow}>
        <AppText style={styles.modeEmoji}>{emoji}</AppText>
        <View style={{ flex: 1, gap: 4 }}>
          <AppText variant="subtitle" weight="800" color={colors.secondary}>
            {title}
          </AppText>
          <AppText variant="caption" color={colors.textMuted}>
            {desc}
          </AppText>
        </View>
      </View>
      <Button label={cta} emoji="✨" onPress={onPress} />
    </Card>
  );
}

const styles = StyleSheet.create({
  hero: { marginTop: spacing.lg, marginBottom: spacing.sm },
  avatar: { alignItems: 'center', marginBottom: spacing.sm },
  modes: { gap: spacing.md, marginTop: spacing.sm },
  modeCard: { gap: spacing.md },
  modeRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  modeEmoji: { fontSize: 44 },
  daily: {
    borderRadius: radius.md,
    borderWidth: 1,
    borderLeftWidth: 4,
    padding: spacing.md,
    marginTop: spacing.sm,
  },
});
