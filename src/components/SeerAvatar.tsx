/**
 * 🔮 Avatar de « Moulat Niya » — la voyante (clairvoyante) IA, mascotte de l'app.
 * Dessinée en SVG (aucune image externe) : visage, foulard/voile traditionnel,
 * petite étoile sur le front et une boule de cristal lumineuse.
 *
 * 👉 Les couleurs s'adaptent au thème via les props (voile = accent doré,
 *    boule = couleur secondaire). Réutilisée sur l'accueil, le chargement
 *    et les résultats pour incarner le personnage.
 */
import React from 'react';
import Svg, { Circle, Defs, Ellipse, G, Path, RadialGradient, Stop } from 'react-native-svg';
import { brand } from '@/theme';

type Props = {
  size?: number;
  /** Couleur du voile / foulard. */
  veil?: string;
  /** Couleur de la boule de cristal. */
  orb?: string;
};

export function SeerAvatar({ size = 140, veil = brand.plum, orb = brand.majorelle }: Props) {
  const skin = '#E8B894';
  const skinShade = '#D69E78';

  return (
    <Svg width={size} height={size} viewBox="0 0 200 200">
      <Defs>
        <RadialGradient id="orbGrad" cx="50%" cy="40%" r="60%">
          <Stop offset="0%" stopColor="#FFFFFF" stopOpacity={0.95} />
          <Stop offset="55%" stopColor={orb} stopOpacity={0.9} />
          <Stop offset="100%" stopColor={orb} stopOpacity={0.55} />
        </RadialGradient>
        <RadialGradient id="haloGrad" cx="50%" cy="50%" r="50%">
          <Stop offset="0%" stopColor={brand.gold} stopOpacity={0.35} />
          <Stop offset="100%" stopColor={brand.gold} stopOpacity={0} />
        </RadialGradient>
      </Defs>

      {/* Halo mystique */}
      <Circle cx={100} cy={92} r={92} fill="url(#haloGrad)" />

      {/* Épaules / buste avec le voile */}
      <Path d="M40 200 Q40 150 100 150 Q160 150 160 200 Z" fill={veil} />

      {/* Voile / foulard autour de la tête */}
      <Path
        d="M58 70 Q58 30 100 30 Q142 30 142 70 Q150 110 130 140 L70 140 Q50 110 58 70 Z"
        fill={veil}
      />

      {/* Visage */}
      <Ellipse cx={100} cy={92} rx={36} ry={42} fill={skin} />
      {/* Ombre douce du visage côté voile */}
      <Path d="M100 50 Q72 56 70 100 Q72 128 100 134 Q88 100 100 50 Z" fill={skinShade} fillOpacity={0.25} />

      {/* Yeux (regard serein, mi-clos de voyante) */}
      <Path d="M80 90 Q88 84 96 90" stroke="#3A2A22" strokeWidth={3} strokeLinecap="round" fill="none" />
      <Path d="M104 90 Q112 84 120 90" stroke="#3A2A22" strokeWidth={3} strokeLinecap="round" fill="none" />
      {/* Petites paupières / cils */}
      <Circle cx={88} cy={92} r={2.4} fill="#3A2A22" />
      <Circle cx={112} cy={92} r={2.4} fill="#3A2A22" />

      {/* Joues */}
      <Circle cx={80} cy={104} r={5} fill="#E8927E" fillOpacity={0.45} />
      <Circle cx={120} cy={104} r={5} fill="#E8927E" fillOpacity={0.45} />

      {/* Bouche / léger sourire énigmatique */}
      <Path d="M90 114 Q100 122 110 114" stroke="#9B4A3C" strokeWidth={3} strokeLinecap="round" fill="none" />

      {/* Bijou / étoile sur le front (le « 3in » de la voyante) */}
      <G>
        <Path
          d="M100 52 l3 7 l7 1 l-5 5 l1 7 l-6 -3 l-6 3 l1 -7 l-5 -5 l7 -1 Z"
          fill={brand.gold}
        />
      </G>

      {/* Boucles d'oreilles dorées */}
      <Circle cx={66} cy={108} r={4} fill={brand.gold} />
      <Circle cx={134} cy={108} r={4} fill={brand.gold} />

      {/* Mains qui présentent la boule de cristal */}
      <Path d="M70 175 Q85 160 100 162 Q115 160 130 175 Z" fill={skin} />

      {/* Boule de cristal lumineuse */}
      <Circle cx={100} cy={170} r={22} fill="url(#orbGrad)" />
      <Circle cx={100} cy={170} r={22} fill="none" stroke="#FFFFFF" strokeOpacity={0.5} strokeWidth={1.5} />
      {/* Reflet */}
      <Ellipse cx={93} cy={163} rx={6} ry={4} fill="#FFFFFF" fillOpacity={0.8} />
      {/* Petites étincelles */}
      <Path d="M122 156 l1.5 3 l3 1.5 l-3 1.5 l-1.5 3 l-1.5 -3 l-3 -1.5 l3 -1.5 Z" fill={brand.gold} />
      <Path d="M78 150 l1 2 l2 1 l-2 1 l-1 2 l-1 -2 l-2 -1 l2 -1 Z" fill={brand.gold} />
    </Svg>
  );
}
