/**
 * Écran de résultat.
 *  - Mode couple : score en %, jauge animée, titre, interprétation, conseils.
 *  - Mode individuel : lecture de l'avenir (amour / travail / projets).
 * Boutons Partager & Recommencer + disclaimer « divertissement ».
 */
import React, { useEffect, useMemo, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Screen } from '@/components/Screen';
import { AppText } from '@/components/AppText';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Gauge } from '@/components/Gauge';
import { useLocale } from '@/context/LocaleContext';
import { useTheme } from '@/context/ThemeContext';
import { useQuiz } from '@/context/QuizContext';
import { radius, spacing } from '@/theme';
import type { CoupleResult, SoloResult } from '@/utils/compatibility';
import { getZodiacInfo } from '@/utils/zodiac';
import { buildShareText } from '@/utils/resultText';
import { shareResult } from '@/utils/share';
import { addHistory } from '@/utils/storage';

export default function ResultScreen() {
  const { t } = useLocale();
  const { colors } = useTheme();
  const { getResult, reset } = useQuiz();
  const router = useRouter();

  // Référence sur la carte de résultat, capturée en image lors du partage.
  const shotRef = useRef<View>(null);

  // On calcule le résultat une seule fois à l'ouverture de l'écran.
  const result = useMemo(() => getResult(), []);

  // On l'ajoute à l'historique local (une seule fois).
  useEffect(() => {
    addHistory(result);
  }, []);

  const onShare = () => {
    shareResult(shotRef, buildShareText(result, t));
  };

  const onRestart = () => {
    reset();
    router.replace('/');
  };

  return (
    <Screen scroll>
      {/* Zone capturée pour le partage en image (fond opaque pour un beau rendu). */}
      <View
        ref={shotRef}
        collapsable={false}
        style={{ backgroundColor: colors.background, borderRadius: radius.lg }}
      >
        {result.mode === 'couple' ? (
          <CoupleView result={result} />
        ) : (
          <SoloView result={result} />
        )}
      </View>

      {/* Actions */}
      <Animated.View entering={FadeInUp.delay(300)} style={styles.actions}>
        <Button label={t.result.share} emoji="📤" onPress={onShare} />
        <Button label={t.result.restart} emoji="🔄" variant="secondary" onPress={onRestart} />
      </Animated.View>

      {/* Disclaimer */}
      <Card alt style={{ marginTop: spacing.sm }}>
        <AppText variant="caption" center color={colors.textMuted}>
          ⚠️ {t.result.disclaimer}
        </AppText>
      </Card>
    </Screen>
  );
}

/** Couleur de la jauge selon le palier de compatibilité. */
function bandColor(bandIndex: number, colors: ReturnType<typeof useTheme>['colors']) {
  if (bandIndex >= 3) return colors.success;
  if (bandIndex === 2) return colors.accent;
  return colors.primary;
}

function SignBadge({ sign, name }: { sign: SoloResult['sign']; name: string }) {
  const { colors } = useTheme();
  const { t } = useLocale();
  const info = getZodiacInfo(sign);
  return (
    <Card style={styles.badge}>
      <AppText style={styles.badgeEmoji}>{info.emoji}</AppText>
      <AppText variant="caption" color={colors.textMuted} center>
        {name}
      </AppText>
      <AppText variant="subtitle" weight="800" center color={colors.secondary}>
        {t.signs[sign].name}
      </AppText>
      <AppText variant="caption" center color={colors.textMuted}>
        {t.signs[sign].trait}
      </AppText>
    </Card>
  );
}

// ---------------------------------------------------------------- Mode couple
function CoupleView({ result }: { result: CoupleResult }) {
  const { t } = useLocale();
  const { colors } = useTheme();
  const band = t.bands[result.bandIndex];
  const color = bandColor(result.bandIndex, colors);

  return (
    <View style={{ gap: spacing.md }}>
      <Animated.View entering={FadeInDown.duration(500)} style={styles.gaugeWrap}>
        <AppText variant="caption" weight="700" color={colors.textMuted}>
          {t.result.scoreLabel}
        </AppText>
        <Gauge value={result.score} color={color} />
        <AppText variant="title" center weight="800" color={color}>
          {band.title}
        </AppText>
      </Animated.View>

      {/* Les deux signes face à face */}
      <View style={styles.couple}>
        <SignBadge sign={result.sign1} name={result.name1} />
        <AppText style={styles.heart}>💞</AppText>
        <SignBadge sign={result.sign2} name={result.name2} />
      </View>

      <Animated.View entering={FadeInUp.delay(150)}>
        <Card>
          <AppText variant="body">{band.paragraph}</AppText>
          <AppText variant="body" style={{ marginTop: spacing.sm }} color={colors.textMuted}>
            {t.elementChemistry[result.chemistry]}
          </AppText>
        </Card>
      </Animated.View>

      <Card alt>
        <AppText variant="subtitle" weight="800" color={colors.primary}>
          💡 {t.result.adviceLabel}
        </AppText>
        <AppText variant="body" style={{ marginTop: spacing.xs }}>
          {band.advice}
        </AppText>
      </Card>
    </View>
  );
}

// ------------------------------------------------------------ Mode individuel
function SoloView({ result }: { result: SoloResult }) {
  const { t } = useLocale();
  const { colors } = useTheme();
  const info = getZodiacInfo(result.sign);
  const solo = t.solo[result.sign];

  const Row = ({ icon, label, text }: { icon: string; label: string; text: string }) => (
    <Card>
      <AppText variant="subtitle" weight="800" color={colors.secondary}>
        {icon} {label}
      </AppText>
      <AppText variant="body" style={{ marginTop: spacing.xs }}>
        {text}
      </AppText>
    </Card>
  );

  return (
    <View style={{ gap: spacing.md }}>
      <Animated.View entering={FadeInDown.duration(500)}>
        <Card alt style={styles.soloHead}>
          <AppText style={styles.soloEmoji}>{info.emoji}</AppText>
          <AppText variant="title" center weight="800" color={colors.primary}>
            {result.name}
          </AppText>
          <AppText variant="subtitle" center weight="700" color={colors.secondary}>
            {t.result.yourSign}: {t.signs[result.sign].name}
          </AppText>
          <AppText variant="caption" center color={colors.textMuted}>
            {t.result.age}: {result.age} • {t.elements[result.element]}
          </AppText>
        </Card>
      </Animated.View>

      <AppText variant="subtitle" weight="800" style={{ marginTop: spacing.xs }}>
        🔮 {t.result.soloTitle}
      </AppText>

      <Animated.View entering={FadeInUp.delay(100)} style={{ gap: spacing.md }}>
        <Row icon="❤️" label={t.result.loveLabel} text={solo.love} />
        <Row icon="💼" label={t.result.workLabel} text={solo.work} />
        <Row icon="🌟" label={t.result.futureLabel} text={solo.future} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  gaugeWrap: { alignItems: 'center', gap: spacing.sm, marginTop: spacing.md },
  couple: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm },
  badge: { flex: 1, alignItems: 'center', gap: 2, paddingVertical: spacing.md },
  badgeEmoji: { fontSize: 48 },
  heart: { fontSize: 30 },
  soloHead: { alignItems: 'center', gap: spacing.xs },
  soloEmoji: { fontSize: 72, textAlign: 'center' },
  actions: { gap: spacing.md, marginTop: spacing.lg },
});
