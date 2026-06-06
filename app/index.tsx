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
import { spacing } from '@/theme';
import type { Mode } from '@/utils/questions';

export default function Home() {
  const { t } = useLocale();
  const { colors } = useTheme();
  const { setMode } = useQuiz();
  const router = useRouter();

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

      <Animated.View entering={FadeInUp.delay(150).duration(500)}>
        <Card alt>
          <AppText variant="body" center>
            {t.onboarding.welcome}
          </AppText>
        </Card>
      </Animated.View>

      <AppText variant="subtitle" weight="800" center style={{ marginTop: spacing.md }}>
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
    </Screen>
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
});
