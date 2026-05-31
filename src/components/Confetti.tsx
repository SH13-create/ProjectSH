/**
 * Petite pluie de confettis (célébration d'un score élevé).
 * 100% reanimated, sans dépendance supplémentaire. Purement décoratif :
 * les positions sont aléatoires (ça n'affecte pas le résultat déterministe).
 */
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { brand } from '@/theme';

const COLORS = [brand.terracotta, brand.majorelle, brand.mint, brand.gold, brand.plum];
const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');

function Piece({ index }: { index: number }) {
  const startX = Math.random() * SCREEN_W;
  const size = 8 + Math.random() * 8;
  const color = COLORS[index % COLORS.length];
  const drift = (Math.random() - 0.5) * 120;
  const delay = Math.random() * 600;
  const duration = 2200 + Math.random() * 1200;
  const rounded = Math.random() > 0.5;

  const progress = useSharedValue(0);

  React.useEffect(() => {
    progress.value = withDelay(delay, withTiming(1, { duration, easing: Easing.in(Easing.quad) }));
  }, []);

  const style = useAnimatedStyle(() => ({
    transform: [
      { translateY: -20 + progress.value * (SCREEN_H + 40) },
      { translateX: progress.value * drift },
      { rotate: `${progress.value * 720}deg` },
    ],
    opacity: 1 - progress.value * progress.value, // disparaît vers la fin
  }));

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          left: startX,
          top: 0,
          width: size,
          height: size * 1.4,
          backgroundColor: color,
          borderRadius: rounded ? size : 2,
        },
        style,
      ]}
    />
  );
}

export function Confetti({ count = 28 }: { count?: number }) {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {Array.from({ length: count }).map((_, i) => (
        <Piece key={i} index={i} />
      ))}
    </View>
  );
}
