/**
 * ℹ️ Page « À propos » — description simple de l'app (darija + français) et
 * disclaimer « divertissement ». Légère et statique.
 */
import React from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Screen } from '@/components/Screen';
import { AppText } from '@/components/AppText';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { SeerAvatar } from '@/components/SeerAvatar';
import { useLocale } from '@/context/LocaleContext';
import { useTheme } from '@/context/ThemeContext';
import { spacing } from '@/theme';

export default function About() {
  const { t } = useLocale();
  const { colors } = useTheme();
  const router = useRouter();

  return (
    <Screen scroll>
      <View style={{ alignItems: 'center', gap: spacing.sm, marginTop: spacing.md }}>
        <SeerAvatar size={120} />
        <AppText variant="title" weight="800" center color={colors.primary}>
          {t.about.title}
        </AppText>
      </View>

      {/* Description en darija */}
      <Animated.View entering={FadeInUp.delay(100)}>
        <Card alt>
          <AppText variant="body">{t.about.body}</AppText>
        </Card>
      </Animated.View>

      {/* Description en français */}
      <Animated.View entering={FadeInUp.delay(160)}>
        <Card>
          <AppText variant="caption" weight="800" color={colors.secondary}>
            🇫🇷 Français
          </AppText>
          <AppText variant="body" dir="ltr" style={{ marginTop: spacing.xs }}>
            {t.about.bodyFr}
          </AppText>
        </Card>
      </Animated.View>

      {/* Disclaimer */}
      <Card alt style={{ marginTop: spacing.xs }}>
        <AppText variant="caption" center color={colors.textMuted}>
          ⚠️ {t.about.disclaimer}
        </AppText>
      </Card>

      <Button
        label={t.common.back}
        emoji="🏠"
        variant="secondary"
        onPress={() => router.back()}
        style={{ marginTop: spacing.lg }}
      />
    </Screen>
  );
}
