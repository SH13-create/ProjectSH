/**
 * Carte de choix « à taper » : grand emoji + libellé. S'illumine quand
 * elle est sélectionnée. Utilisée pour les questions de type single/cards.
 */
import React from 'react';
import { Platform, Pressable, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useTheme } from '@/context/ThemeContext';
import { radius, softShadow, spacing } from '@/theme';
import { AppText } from './AppText';

type Props = {
  label: string;
  emoji?: string;
  selected: boolean;
  onPress: () => void;
  /** 'grid' = grande carte (2 colonnes), 'row' = ligne large (liste). */
  layout?: 'grid' | 'row';
};

export function ChoiceCard({ label, emoji, selected, onPress, layout = 'grid' }: Props) {
  const { colors } = useTheme();
  const scale = useSharedValue(1);
  const animStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <Animated.View style={[animStyle, layout === 'grid' ? styles.gridWrap : styles.rowWrap]}>
      <Pressable
        onPressIn={() => (scale.value = withSpring(0.95, { damping: 14 }))}
        onPressOut={() => (scale.value = withSpring(1, { damping: 14 }))}
        onPress={() => {
          if (Platform.OS !== 'web') {
            Haptics.selectionAsync().catch(() => {});
          }
          onPress();
        }}
        style={[
          styles.card,
          layout === 'row' && styles.cardRow,
          {
            backgroundColor: selected ? colors.primary : colors.surface,
            borderColor: selected ? colors.primary : colors.border,
          },
          softShadow(colors.shadow),
        ]}
      >
        {emoji ? (
          <AppText style={[styles.emoji, layout === 'row' && styles.emojiRow]}>{emoji}</AppText>
        ) : null}
        <AppText
          variant="subtitle"
          center={layout === 'grid'}
          color={selected ? colors.primaryText : colors.text}
          weight="700"
        >
          {label}
        </AppText>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  gridWrap: { width: '48%' },
  rowWrap: { width: '100%' },
  card: {
    borderRadius: radius.md,
    borderWidth: 2,
    padding: spacing.lg,
    minHeight: 120,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  cardRow: {
    flexDirection: 'row',
    minHeight: 70,
    justifyContent: 'flex-start',
    gap: spacing.md,
  },
  emoji: { fontSize: 44 },
  emojiRow: { fontSize: 30 },
});
