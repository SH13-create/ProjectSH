/**
 * 🌊 Indicateur animé « Moulat Niya parle » : des barres qui ondulent comme
 * une onde sonore. Donne l'impression d'une voix vivante pendant le TTS.
 * Animé avec reanimated. Quand `active` repasse à false, les barres se calment.
 */
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '@/context/ThemeContext';

function Bar({ active, delay, color }: { active: boolean; delay: number; color: string }) {
  const h = useSharedValue(0.3);
  useEffect(() => {
    if (active) {
      h.value = withDelay(
        delay,
        withRepeat(withTiming(1, { duration: 360, easing: Easing.inOut(Easing.ease) }), -1, true),
      );
    } else {
      h.value = withTiming(0.3, { duration: 200 });
    }
  }, [active]);

  const style = useAnimatedStyle(() => ({ transform: [{ scaleY: h.value }] }));
  return <Animated.View style={[styles.bar, { backgroundColor: color }, style]} />;
}

export function SpeakingWave({ active, color }: { active: boolean; color?: string }) {
  const { colors } = useTheme();
  const c = color ?? colors.primary;
  const delays = [0, 120, 240, 120, 0, 180, 60];
  return (
    <View style={styles.row}>
      {delays.map((d, i) => (
        <Bar key={i} active={active} delay={d} color={c} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 5, height: 28 },
  bar: { width: 5, height: 26, borderRadius: 3 },
});
