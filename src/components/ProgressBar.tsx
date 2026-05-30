/**
 * Barre de progression du quiz, animée en douceur avec reanimated.
 * Respecte le sens de lecture (remplissage à droite en mode RTL).
 */
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useLocale } from '@/context/LocaleContext';
import { useTheme } from '@/context/ThemeContext';
import { radius } from '@/theme';

export function ProgressBar({ progress }: { progress: number }) {
  const { colors } = useTheme();
  const { isRTL } = useLocale();
  const w = useSharedValue(progress);

  useEffect(() => {
    w.value = withTiming(progress, { duration: 400 });
  }, [progress]);

  const fillStyle = useAnimatedStyle(() => ({ width: `${Math.round(w.value * 100)}%` }));

  return (
    <View style={[styles.track, { backgroundColor: colors.border, flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
      <Animated.View style={[styles.fill, { backgroundColor: colors.primary }, fillStyle]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 12,
    borderRadius: radius.pill,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: radius.pill,
  },
});
