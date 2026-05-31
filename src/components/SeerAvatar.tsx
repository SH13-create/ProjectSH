/**
 * 🔮 Avatar de « Moulat Niya » — la voyante (chouwafa) IA, mascotte de l'app.
 *
 * Représente une VIEILLE FEMME MAROCAINE AMAZIGHE : visage âgé (rides),
 * tatouages amazighs traditionnels (ligne du menton « siyala », marque du
 * front, symboles sur les joues), foulard traditionnel et boule de cristal.
 *
 * ⚠️ IMAGE RÉALISTE : cet avatar est une illustration vectorielle (SVG).
 * Pour une vraie PHOTO réaliste générée par IA, dépose ton image dans
 *   assets/seer.png
 * puis mets USE_PHOTO = true ci-dessous (voir aussi le README, section Avatar).
 *
 * 👉 Couleurs ajustables via les props (voile, boule, tatouages).
 */
import React from 'react';
import { Image } from 'react-native';
import Svg, { Circle, Defs, Ellipse, G, Line, Path, RadialGradient, Stop } from 'react-native-svg';
import { brand } from '@/theme';

// Passe à true APRÈS avoir déposé une vraie photo dans assets/seer.png.
const USE_PHOTO = false;

type Props = {
  size?: number;
  veil?: string; // couleur du foulard
  orb?: string; // couleur de la boule de cristal
  tattoo?: string; // couleur des tatouages amazighs (bleu-vert traditionnel)
};

export function SeerAvatar({
  size = 140,
  veil = brand.plum,
  orb = brand.majorelle,
  tattoo = '#1F5C4D',
}: Props) {
  // --- Option PHOTO réaliste (drop-in) -------------------------------------
  if (USE_PHOTO) {
    return (
      <Image
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        source={require('../../assets/seer.png')}
        style={{ width: size, height: size, borderRadius: size / 2 }}
        resizeMode="cover"
      />
    );
  }

  // --- Illustration vectorielle (par défaut) -------------------------------
  const skin = '#D9A878'; // teint mat
  const skinShade = '#B9895E';
  const hair = '#C9C2BA'; // cheveux gris (âge)

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
      <Path d="M36 200 Q36 150 100 150 Q164 150 164 200 Z" fill={veil} />
      {/* Pli du châle */}
      <Path d="M60 200 Q100 168 140 200 Z" fill="#000000" fillOpacity={0.12} />

      {/* Mèches de cheveux gris qui dépassent du foulard */}
      <Path d="M62 78 Q58 96 64 112 Q66 96 70 84 Z" fill={hair} />
      <Path d="M138 78 Q142 96 136 112 Q134 96 130 84 Z" fill={hair} />

      {/* Foulard / voile traditionnel autour de la tête */}
      <Path
        d="M56 74 Q56 28 100 28 Q144 28 144 74 Q150 104 132 132 L68 132 Q50 104 56 74 Z"
        fill={veil}
      />
      {/* Bord brodé du foulard */}
      <Path
        d="M56 74 Q56 28 100 28 Q144 28 144 74"
        fill="none"
        stroke={brand.gold}
        strokeWidth={3}
        strokeOpacity={0.8}
      />

      {/* Visage (un peu plus allongé / âgé) */}
      <Ellipse cx={100} cy={94} rx={37} ry={44} fill={skin} />
      <Path d="M100 52 Q72 58 70 102 Q72 130 100 138 Q88 100 100 52 Z" fill={skinShade} fillOpacity={0.25} />

      {/* RIDES (âge) : front + pattes d'oie + sillons */}
      <Path d="M82 70 Q100 64 118 70" stroke={skinShade} strokeWidth={2} fill="none" strokeOpacity={0.7} />
      <Path d="M84 76 Q100 71 116 76" stroke={skinShade} strokeWidth={1.6} fill="none" strokeOpacity={0.6} />
      <Path d="M70 92 q-5 3 -6 8" stroke={skinShade} strokeWidth={1.6} fill="none" strokeOpacity={0.6} />
      <Path d="M130 92 q5 3 6 8" stroke={skinShade} strokeWidth={1.6} fill="none" strokeOpacity={0.6} />
      {/* Sillons nasogéniens */}
      <Path d="M84 104 Q80 116 86 124" stroke={skinShade} strokeWidth={1.6} fill="none" strokeOpacity={0.5} />
      <Path d="M116 104 Q120 116 114 124" stroke={skinShade} strokeWidth={1.6} fill="none" strokeOpacity={0.5} />

      {/* Sourcils grisonnants */}
      <Path d="M80 84 Q88 80 95 83" stroke="#8A8178" strokeWidth={3} strokeLinecap="round" fill="none" />
      <Path d="M105 83 Q112 80 120 84" stroke="#8A8178" strokeWidth={3} strokeLinecap="round" fill="none" />

      {/* Yeux (regard sage et perçant de voyante) */}
      <Ellipse cx={88} cy={92} rx={6} ry={4} fill="#FFFFFF" />
      <Ellipse cx={112} cy={92} rx={6} ry={4} fill="#FFFFFF" />
      <Circle cx={88} cy={92} r={2.6} fill="#3A2A22" />
      <Circle cx={112} cy={92} r={2.6} fill="#3A2A22" />

      {/* Nez */}
      <Path d="M100 96 q-3 8 -4 12 q4 3 8 0" stroke={skinShade} strokeWidth={2} fill="none" strokeLinecap="round" />

      {/* Bouche / léger sourire énigmatique */}
      <Path d="M90 122 Q100 129 110 122" stroke="#9B4A3C" strokeWidth={3} strokeLinecap="round" fill="none" />

      {/* ===== TATOUAGES AMAZIGHS (bleu-vert traditionnel) ===== */}
      {/* Marque du front (losange + trait vertical) */}
      <G stroke={tattoo} strokeWidth={2.4} fill="none" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M100 58 l4 5 l-4 5 l-4 -5 Z" />
        <Line x1={100} y1={68} x2={100} y2={62} />
      </G>
      {/* « Siyala » : ligne verticale du menton (signe amazigh emblématique) */}
      <G stroke={tattoo} strokeWidth={2.4} strokeLinecap="round">
        <Line x1={100} y1={130} x2={100} y2={138} />
        <Line x1={96} y1={134} x2={104} y2={134} />
        {/* petits chevrons sous la lèvre */}
        <Path d="M96 130 l4 -3 l4 3" fill="none" />
      </G>
      {/* Symboles sur les joues (croix/points berbères) */}
      <G stroke={tattoo} strokeWidth={2} strokeLinecap="round">
        <Line x1={74} y1={108} x2={74} y2={116} />
        <Line x1={70} y1={112} x2={78} y2={112} />
        <Line x1={126} y1={108} x2={126} y2={116} />
        <Line x1={122} y1={112} x2={130} y2={112} />
      </G>
      <Circle cx={74} cy={104} r={1.6} fill={tattoo} />
      <Circle cx={126} cy={104} r={1.6} fill={tattoo} />

      {/* Boucles d'oreilles berbères (grands anneaux dorés) */}
      <Circle cx={64} cy={112} r={6} fill="none" stroke={brand.gold} strokeWidth={3} />
      <Circle cx={136} cy={112} r={6} fill="none" stroke={brand.gold} strokeWidth={3} />

      {/* Mains ridées qui présentent la boule de cristal */}
      <Path d="M68 176 Q85 160 100 162 Q115 160 132 176 Z" fill={skin} />

      {/* Boule de cristal lumineuse */}
      <Circle cx={100} cy={172} r={22} fill="url(#orbGrad)" />
      <Circle cx={100} cy={172} r={22} fill="none" stroke="#FFFFFF" strokeOpacity={0.5} strokeWidth={1.5} />
      <Ellipse cx={93} cy={165} rx={6} ry={4} fill="#FFFFFF" fillOpacity={0.8} />
      {/* Étincelles */}
      <Path d="M122 158 l1.5 3 l3 1.5 l-3 1.5 l-1.5 3 l-1.5 -3 l-3 -1.5 l3 -1.5 Z" fill={brand.gold} />
      <Path d="M78 152 l1 2 l2 1 l-2 1 l-1 2 l-1 -2 l-2 -1 l2 -1 Z" fill={brand.gold} />
    </Svg>
  );
}
