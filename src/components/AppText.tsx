/**
 * Composant texte de base : applique automatiquement la couleur du thème,
 * le sens d'écriture (RTL pour l'arabe) et des tailles cohérentes.
 * Utilise-le partout au lieu de <Text> pour rester cohérent.
 */
import React from 'react';
import { StyleSheet, Text, type TextProps, type TextStyle } from 'react-native';
import { useLocale } from '@/context/LocaleContext';
import { useTheme } from '@/context/ThemeContext';
import { fontSize } from '@/theme';

type Variant = 'display' | 'title' | 'subtitle' | 'body' | 'caption';

type Props = TextProps & {
  variant?: Variant;
  color?: string;
  center?: boolean;
  weight?: TextStyle['fontWeight'];
  /** Force le sens d'écriture (utile pour les compteurs « 7 / 10 » en mode RTL). */
  dir?: 'ltr' | 'rtl';
};

const VARIANT_STYLE: Record<Variant, TextStyle> = {
  display: { fontSize: fontSize.display, fontWeight: '800' },
  title: { fontSize: fontSize.xl, fontWeight: '800' },
  subtitle: { fontSize: fontSize.lg, fontWeight: '700' },
  body: { fontSize: fontSize.md, fontWeight: '500' },
  caption: { fontSize: fontSize.sm, fontWeight: '500' },
};

export function AppText({ variant = 'body', color, center, weight, dir, style, ...rest }: Props) {
  const { colors } = useTheme();
  const { isRTL } = useLocale();

  return (
    <Text
      {...rest}
      style={[
        VARIANT_STYLE[variant],
        {
          color: color ?? colors.text,
          writingDirection: dir ?? (isRTL ? 'rtl' : 'ltr'),
          textAlign: center ? 'center' : isRTL ? 'right' : 'left',
        },
        weight ? { fontWeight: weight } : null,
        style,
      ]}
    />
  );
}

export const textStyles = StyleSheet.create({});
