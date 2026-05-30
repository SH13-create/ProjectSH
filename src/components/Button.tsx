/**
 * Bouton réutilisable : grand, arrondi, avec retour haptique et animation
 * d'appui (scale). Trois styles : primary (action), secondary, ghost.
 */
import React from 'react';
import { Platform, Pressable, StyleSheet, View, type ViewStyle } from 'react-native';
import * as Haptics from 'expo-haptics';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useTheme } from '@/context/ThemeContext';
import { radius, softShadow, spacing } from '@/theme';
import { AppText } from './AppText';

type Variant = 'primary' | 'secondary' | 'ghost';

type Props = {
  label: string;
  onPress: () => void;
  variant?: Variant;
  disabled?: boolean;
  emoji?: string;
  style?: ViewStyle;
};

export function Button({ label, onPress, variant = 'primary', disabled, emoji, style }: Props) {
  const { colors } = useTheme();
  const scale = useSharedValue(1);

  const animStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  const bg =
    variant === 'primary' ? colors.primary : variant === 'secondary' ? colors.secondary : 'transparent';
  const fg = variant === 'ghost' ? colors.text : colors.primaryText;
  const isGhost = variant === 'ghost';

  return (
    <Animated.View style={[animStyle, style]}>
      <Pressable
        disabled={disabled}
        onPressIn={() => (scale.value = withSpring(0.96, { damping: 14 }))}
        onPressOut={() => (scale.value = withSpring(1, { damping: 14 }))}
        onPress={() => {
          if (Platform.OS !== 'web') {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
          }
          onPress();
        }}
        style={[
          styles.base,
          {
            backgroundColor: bg,
            opacity: disabled ? 0.45 : 1,
            borderWidth: isGhost ? 1.5 : 0,
            borderColor: colors.border,
          },
          !isGhost && softShadow(colors.shadow),
        ]}
      >
        <View style={styles.row}>
          {emoji ? <AppText style={styles.emoji}>{emoji}</AppText> : null}
          <AppText variant="subtitle" color={fg} center weight="700">
            {label}
          </AppText>
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 60,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  emoji: { fontSize: 22 },
});
