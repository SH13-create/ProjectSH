/**
 * Fond décoratif inspiré du zellige marocain : une grille discrète de motifs
 * géométriques (étoiles à 8 branches) dessinée en SVG, par-dessus la couleur
 * de fond du thème. Volontairement très léger pour ne pas gêner la lecture.
 */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';
import { useTheme } from '@/context/ThemeContext';
import { absoluteFill } from '@/theme';

// Une étoile à 8 branches (motif zellige classique) dessinée dans une case 40x40.
function Star8({ color }: { color: string }) {
  // Deux carrés superposés tournés de 45°, simplifiés en un seul tracé d'étoile.
  const d =
    'M20 2 L24 14 L36 12 L28 22 L38 30 L26 30 L24 42 L20 31 L16 42 L14 30 L2 30 L12 22 L4 12 L16 14 Z';
  return <Path d={d} fill={color} fillOpacity={0.5} />;
}

export function ZelligeBackground({ children }: { children?: React.ReactNode }) {
  const { colors } = useTheme();
  const cols = 7;
  const rows = 16;
  const size = 56;

  return (
    <View style={[StyleSheet.absoluteFill, { backgroundColor: colors.background }]}>
      <Svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${cols * size} ${rows * size}`}
        preserveAspectRatio="xMidYMid slice"
        style={styles.svg}
      >
        {Array.from({ length: rows }).map((_, r) =>
          Array.from({ length: cols }).map((__, c) => (
            <G key={`${r}-${c}`} transform={`translate(${c * size + 8}, ${r * size + 8})`}>
              <Star8 color={colors.pattern} />
            </G>
          )),
        )}
      </Svg>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  // Motif très discret en arrière-plan.
  svg: { ...absoluteFill, opacity: 0.12 },
});
