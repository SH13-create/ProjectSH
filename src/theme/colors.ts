/**
 * 🎨 Palette de couleurs — inspirée du zellige marocain et de l'artisanat.
 *
 * 👉 Pour changer l'apparence de l'app, modifie simplement les valeurs ci-dessous.
 * Chaque couleur existe en version "light" (mode clair) et "dark" (mode sombre).
 */

// Couleurs de marque (identiques dans les deux modes) — l'âme visuelle de l'app.
export const brand = {
  terracotta: '#C75B39', // terre cuite
  majorelle: '#2E4CB8', // bleu Majorelle
  mint: '#3FA796', // vert menthe
  gold: '#D9A441', // doré
  cream: '#FBF6EC', // crème
  plum: '#7A3B69', // prune (accent)
};

export type ColorScheme = {
  background: string; // fond principal
  surface: string; // cartes, panneaux
  surfaceAlt: string; // cartes secondaires
  primary: string; // couleur d'action principale
  primaryText: string; // texte sur la couleur primaire
  accent: string; // accents / éléments décoratifs
  secondary: string; // boutons secondaires
  text: string; // texte principal
  textMuted: string; // texte secondaire / discret
  border: string; // bordures douces
  pattern: string; // motif géométrique d'arrière-plan
  success: string;
  shadow: string;
};

export const lightColors: ColorScheme = {
  background: brand.cream,
  surface: '#FFFFFF',
  surfaceAlt: '#FFF3E2',
  primary: brand.terracotta,
  primaryText: '#FFFFFF',
  accent: brand.gold,
  secondary: brand.majorelle,
  text: '#2A2018',
  textMuted: '#7A6E60',
  border: '#EADBC4',
  pattern: '#E7C9A0',
  success: brand.mint,
  shadow: '#00000022',
};

export const darkColors: ColorScheme = {
  background: '#16131C',
  surface: '#221C2B',
  surfaceAlt: '#2C2436',
  primary: brand.terracotta,
  primaryText: '#FFFFFF',
  accent: brand.gold,
  secondary: '#5C73E0',
  text: '#F3ECDD',
  textMuted: '#B3A695',
  border: '#3A3145',
  pattern: '#3A3145',
  success: brand.mint,
  shadow: '#00000066',
};
