/**
 * Jauge circulaire animée pour afficher le score de compatibilité en %.
 * L'arc se remplit avec reanimated et le chiffre compte en montant.
 */
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { useTheme } from '@/context/ThemeContext';
import { absoluteFill } from '@/theme';
import { AppText } from './AppText';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type Props = {
  /** Score 0-100. */
  value: number;
  size?: number;
  color?: string;
};

export function Gauge({ value, size = 200, color }: Props) {
  const { colors } = useTheme();
  const stroke = 18;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;

  const progress = useSharedValue(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    // Animation de l'arc (1.2s) + comptage du chiffre en parallèle.
    progress.value = withTiming(value / 100, { duration: 1200, easing: Easing.out(Easing.cubic) });

    const start = Date.now();
    const duration = 1200;
    const id = setInterval(() => {
      const t = Math.min(1, (Date.now() - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(eased * value));
      if (t >= 1) clearInterval(id);
    }, 30);
    return () => clearInterval(id);
  }, [value]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: c * (1 - progress.value),
  }));

  const arcColor = color ?? colors.primary;

  return (
    <View style={[styles.wrap, { width: size, height: size }]}>
      <Svg width={size} height={size}>
        {/* Piste de fond */}
        <Circle cx={size / 2} cy={size / 2} r={r} stroke={colors.border} strokeWidth={stroke} fill="none" />
        {/* Arc de progression */}
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={arcColor}
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={c}
          animatedProps={animatedProps}
          // On démarre l'arc en haut.
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      <View style={styles.center} pointerEvents="none">
        <AppText variant="display" color={arcColor} center weight="800">
          {display}%
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', justifyContent: 'center' },
  center: { ...absoluteFill, alignItems: 'center', justifyContent: 'center' },
});
