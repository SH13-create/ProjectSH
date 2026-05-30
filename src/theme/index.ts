/**
 * Tokens de design réutilisables : espacements, rayons, typographie, ombres.
 * Combinés avec la palette de couleurs (colors.ts) pour garder une UI cohérente.
 */
import { Platform } from 'react-native';

export * from './colors';

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Remplit complètement le parent (équivalent de StyleSheet.absoluteFillObject).
export const absoluteFill = {
  position: 'absolute' as const,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
};

export const radius = {
  sm: 10,
  md: 18,
  lg: 26,
  pill: 999,
};

export const fontSize = {
  xs: 13,
  sm: 15,
  md: 18,
  lg: 22,
  xl: 28,
  xxl: 36,
  display: 46,
};

// Ombre douce, multi-plateforme (iOS / Android / Web).
export const softShadow = (shadowColor: string) =>
  Platform.select({
    web: { boxShadow: `0px 8px 24px ${shadowColor}` },
    default: {
      shadowColor,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 1,
      shadowRadius: 16,
      elevation: 6,
    },
  }) as object;
