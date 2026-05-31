/**
 * Écran de calcul « جاري التحليل... » : animation amusante (lune, étoiles,
 * cœurs qui tournent) pendant ~2,5 s pour créer le suspense, puis résultat.
 */
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, {
  Easing,
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { Screen } from '@/components/Screen';
import { AppText } from '@/components/AppText';
import { SeerAvatar } from '@/components/SeerAvatar';
import { useLocale } from '@/context/LocaleContext';
import { useTheme } from '@/context/ThemeContext';
import { absoluteFill, spacing } from '@/theme';

export default function Loading() {
  const { t } = useLocale();
  const { colors } = useTheme();
  const router = useRouter();

  const spin = useSharedValue(0);
  const pulse = useSharedValue(1);

  useEffect(() => {
    spin.value = withRepeat(withTiming(1, { duration: 2200, easing: Easing.linear }), -1);
    pulse.value = withRepeat(withTiming(1.25, { duration: 700, easing: Easing.inOut(Easing.ease) }), -1, true);

    // Suspense puis navigation vers le résultat.
    const id = setTimeout(() => router.replace('/result'), 2600);
    return () => clearTimeout(id);
  }, []);

  const ringStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${spin.value * 360}deg` }],
  }));
  const moonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
  }));

  // Petits symboles disposés en cercle, qui tournent ensemble.
  const symbols = ['⭐', '💖', '🌙', '✨', '💫', '❤️', '🌟', '💕'];

  return (
    <Screen center>
      <View style={styles.stage}>
        <Animated.View style={[styles.ring, ringStyle]}>
          {symbols.map((s, i) => {
            const angle = (i / symbols.length) * 2 * Math.PI;
            const radius = 110;
            return (
              <AppText
                key={i}
                style={[
                  styles.symbol,
                  {
                    transform: [
                      { translateX: Math.cos(angle) * radius },
                      { translateY: Math.sin(angle) * radius },
                    ],
                  },
                ]}
              >
                {s}
              </AppText>
            );
          })}
        </Animated.View>
        <Animated.View style={moonStyle}>
          <SeerAvatar size={120} />
        </Animated.View>
      </View>

      <Animated.View entering={FadeIn.delay(200)} style={{ gap: spacing.sm }}>
        <AppText variant="title" center weight="800" color={colors.primary}>
          {t.loading.title}
        </AppText>
        <AppText variant="body" center color={colors.textMuted}>
          {t.loading.sub}
        </AppText>
      </Animated.View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  stage: {
    width: 260,
    height: 260,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  ring: {
    ...absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  symbol: { position: 'absolute', fontSize: 30 },
});
