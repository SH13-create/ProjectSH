/**
 * Médaillon vectoriel d'un signe astrologique (remplace l'emoji).
 * Dessiné en SVG : une étoile zellige à 8 branches dans la couleur de
 * l'élément + le glyphe astrologique au centre. Lisible en clair et sombre.
 *
 * 👉 Pour changer les couleurs par élément : src/utils/zodiac.ts → ELEMENT_COLOR.
 */
import React from 'react';
import Svg, { Circle, Path, Text as SvgText } from 'react-native-svg';
import { ELEMENT_COLOR, getZodiacInfo, type ZodiacSign } from '@/utils/zodiac';

// Construit le tracé d'une étoile à 8 branches centrée dans une zone 100x100.
function star8Path(outer: number, inner: number, cx = 50, cy = 50): string {
  const points: string[] = [];
  const spikes = 8;
  for (let i = 0; i < spikes * 2; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const angle = (Math.PI / spikes) * i - Math.PI / 2;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    points.push(`${x.toFixed(2)},${y.toFixed(2)}`);
  }
  return `M${points.join(' L')} Z`;
}

const STAR = star8Path(48, 38);

type Props = {
  sign: ZodiacSign;
  size?: number;
};

export function ZodiacBadge({ sign, size = 64 }: Props) {
  const { symbol, element } = getZodiacInfo(sign);
  const color = ELEMENT_COLOR[element];

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* Étoile zellige (cadre décoratif) */}
      <Path d={STAR} fill={color} fillOpacity={0.12} stroke={color} strokeWidth={3} strokeLinejoin="round" />
      {/* Cercle intérieur */}
      <Circle cx={50} cy={50} r={30} fill={color} fillOpacity={0.16} stroke={color} strokeWidth={2} />
      {/* Glyphe astrologique */}
      <SvgText
        x={50}
        y={50}
        fill={color}
        fontSize={34}
        fontWeight="bold"
        textAnchor="middle"
        alignmentBaseline="central"
      >
        {symbol}
      </SvgText>
    </Svg>
  );
}
