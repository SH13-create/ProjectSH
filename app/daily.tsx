/**
 * 🌅 Mode quotidien guidé « Bda m3a Moulat Niya ».
 *
 * Expérience pas-à-pas pensée pour la rétention :
 *  1) Moulat Niya accueille (bulle + petite question).
 *  2) L'utilisateur tape « Découvre le message du jour ».
 *  3) Révélation animée : mot du jour + blague + conseil + sensation de
 *     récompense (« tu as découvert le message d'aujourd'hui »).
 *  4) Partage du message du jour + « reviens demain ».
 *
 * Contenu DÉTERMINISTE-PAR-JOUR (dailyPick) : change chaque 24h, sans stockage.
 * Léger : aucun appel réseau, juste des textes locaux.
 */
import React, { useState } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';
import Animated, { FadeIn, FadeInUp, ZoomIn } from 'react-native-reanimated';
import { Screen } from '@/components/Screen';
import { AppText } from '@/components/AppText';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { SeerAvatar } from '@/components/SeerAvatar';
import { useLocale } from '@/context/LocaleContext';
import { useTheme } from '@/context/ThemeContext';
import { spacing } from '@/theme';
import { dailyPick } from '@/utils/oracle';
import { shareText } from '@/utils/share';

export default function Daily() {
  const { t } = useLocale();
  const { colors } = useTheme();
  const router = useRouter();
  const d = t.daily;

  const now = new Date();
  const word = dailyPick(d.wordPool, now, 'word');
  const joke = dailyPick(d.jokePool, now, 'joke');
  const advice = dailyPick(d.advicePool, now, 'advice');

  const [revealed, setRevealed] = useState(false);

  const reveal = () => {
    if (Platform.OS !== 'web') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    }
    setRevealed(true);
  };

  const onShare = () => {
    shareText(`🔮 ${t.common.seerName}\n${word}\n\n— ${t.common.appName}`);
  };

  return (
    <Screen scroll center={!revealed}>
      <View style={{ alignItems: 'center', gap: spacing.sm }}>
        <SeerAvatar size={130} />
        <AppText variant="title" weight="800" center color={colors.primary}>
          {t.common.seerName}
        </AppText>
      </View>

      {/* Étape 1 : accueil chaleureux */}
      <Animated.View entering={FadeInUp.delay(100)}>
        <Card alt>
          <AppText variant="body" center>
            {d.intro1}
          </AppText>
          {!revealed ? (
            <AppText variant="body" center weight="700" color={colors.secondary} style={{ marginTop: spacing.sm }}>
              {d.intro2}
            </AppText>
          ) : null}
        </Card>
      </Animated.View>

      {!revealed ? (
        /* Étape 2 : le seul bouton — révéler */
        <Animated.View entering={FadeInUp.delay(220)}>
          <Button label={d.revealCta} onPress={reveal} style={{ marginTop: spacing.lg }} />
        </Animated.View>
      ) : (
        /* Étape 3 : révélation + récompense + partage */
        <Animated.View entering={FadeIn} style={{ gap: spacing.md }}>
          <Animated.View entering={ZoomIn.duration(400)} style={{ alignItems: 'center', marginTop: spacing.sm }}>
            <AppText variant="caption" weight="800" color={colors.success}>
              {d.discovered}
            </AppText>
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(120)}>
            <RevealCard icon="🌙" label={d.wordLabel} text={word} accent={colors.secondary} />
          </Animated.View>
          <Animated.View entering={FadeInUp.delay(220)}>
            <RevealCard icon="🌟" label={d.adviceLabel} text={advice} accent={colors.accent} />
          </Animated.View>
          <Animated.View entering={FadeInUp.delay(320)}>
            <RevealCard icon="😄" label={d.jokeLabel} text={joke} accent={colors.primary} />
          </Animated.View>

          <Button label={d.shareToday} emoji="🔗" variant="secondary" onPress={onShare} style={{ marginTop: spacing.sm }} />

          {/* Boucle de rétention */}
          <Card alt>
            <AppText variant="body" center weight="700" color={colors.primary}>
              {d.comeback}
            </AppText>
          </Card>
        </Animated.View>
      )}

      <Button
        label={t.common.back}
        emoji="🏠"
        variant="ghost"
        onPress={() => router.back()}
        style={{ marginTop: spacing.md }}
      />
    </Screen>
  );
}

/** Carte de révélation : pastille colorée + texte court. */
function RevealCard({ icon, label, text, accent }: { icon: string; label: string; text: string; accent: string }) {
  const { colors } = useTheme();
  return (
    <Card style={{ borderLeftWidth: 4, borderLeftColor: accent }}>
      <AppText variant="caption" weight="800" color={accent}>
        {icon} {label}
      </AppText>
      <AppText variant="body" style={{ marginTop: spacing.xs }}>
        {text}
      </AppText>
    </Card>
  );
}
