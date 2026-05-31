/**
 * Écran de résultat.
 *  - Mode couple : score en %, jauge animée, titre, interprétation, conseils.
 *  - Mode individuel : lecture de l'avenir (amour / travail / projets).
 * Boutons Partager & Recommencer + disclaimer « divertissement ».
 */
import React, { useEffect, useMemo, useRef } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import Animated, {
  Easing,
  FadeInDown,
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { Screen } from '@/components/Screen';
import { AppText } from '@/components/AppText';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Confetti } from '@/components/Confetti';
import { Gauge } from '@/components/Gauge';
import { useLocale } from '@/context/LocaleContext';
import { useTheme } from '@/context/ThemeContext';
import { useQuiz } from '@/context/QuizContext';
import { radius, spacing } from '@/theme';
import type { CoupleResult, SoloResult } from '@/utils/compatibility';
import { ZodiacBadge } from '@/components/ZodiacBadge';
import { format } from '@/locales';
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

  // On fête les grands scores (couple, palier ≥ 3).
  const celebrate = result.mode === 'couple' && result.bandIndex >= 3;

  // On l'ajoute à l'historique local (une seule fois) + vibration de réussite.
  useEffect(() => {
    addHistory(result);
    if (celebrate && Platform.OS !== 'web') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    }
  }, []);

  const onShare = () => {
    shareResult(shotRef, buildShareText(result, t));
  };

  const onRestart = () => {
    reset();
    router.replace('/');
  };

  return (
    <>
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

      {/* Confettis par-dessus tout l'écran pour les beaux scores. */}
      {celebrate && <Confetti />}
    </>
  );
}

/** Petit cœur qui bat (micro-animation décorative entre les deux signes). */
function PulseHeart() {
  const scale = useSharedValue(1);
  useEffect(() => {
    scale.value = withRepeat(withTiming(1.25, { duration: 650, easing: Easing.inOut(Easing.ease) }), -1, true);
  }, []);
  const style = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  return (
    <Animated.View style={style}>
      <AppText style={styles.heart}>💞</AppText>
    </Animated.View>
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
  return (
    <Card style={styles.badge}>
      <ZodiacBadge sign={sign} size={72} />
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
        <PulseHeart />
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

      {/* Interprétation propre à la PAIRE de signes (façon d'aimer de chacun). */}
      <Animated.View entering={FadeInUp.delay(220)}>
        <Card alt>
          <AppText variant="body">
            {format(t.coupleNarrative, {
              a: t.coupleStyle[result.sign1],
              b: t.coupleStyle[result.sign2],
            })}
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
          <ZodiacBadge sign={result.sign} size={110} />
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
  heart: { fontSize: 30 },
  soloHead: { alignItems: 'center', gap: spacing.xs },
  actions: { gap: spacing.md, marginTop: spacing.lg },
});
