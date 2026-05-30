/**
 * Carte générique : surface arrondie avec ombre douce, pour regrouper du contenu.
 */
import React from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { radius, softShadow, spacing } from '@/theme';

type Props = {
  children: React.ReactNode;
  style?: ViewStyle;
  alt?: boolean; // utilise la surface secondaire
};

export function Card({ children, style, alt }: Props) {
  const { colors } = useTheme();
  return (
    <View
      style={[
        styles.card,
        { backgroundColor: alt ? colors.surfaceAlt : colors.surface, borderColor: colors.border },
        softShadow(colors.shadow),
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
  },
});
