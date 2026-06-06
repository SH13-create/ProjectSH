/**
 * 🔮 Avatar de « Moulat Niya » — la voyante, mascotte premium de l'app.
 *
 * Représente une VOYANTE MAROCAINE MODERNE & ÉLÉGANTE (~40 ans) : caftan,
 * foulard élégant, bijoux dorés, regard chaleureux et mystérieux, sur un fond
 * mystique (dégradé bleu nuit → violet, étoiles, lune douce, lueur dorée).
 *
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 📸 POUR UTILISER UN VRAI PORTRAIT IA PHOTORÉALISTE (recommandé) :
 *   1. Génère l'image (Midjourney / DALL·E / Firefly…) — prompt dans le README.
 *   2. Enregistre-la sous  assets/seer.png  (carré, idéalement 768×768+).
 *   3. Mets  USE_PHOTO = true  ci-dessous.
 * L'app affichera alors la photo dans le même cadre doré premium, partout.
 * (Cet environnement n'a pas de générateur d'images : l'illustration vectorielle
 *  ci-dessous sert de visuel élégant en attendant la vraie photo.)
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */
import React from 'react';
import { Image, View } from 'react-native';
import Svg, {
  Circle,
  Defs,
  Ellipse,
  G,
  LinearGradient,
  Path,
  RadialGradient,
  Stop,
} from 'react-native-svg';
import { brand } from '@/theme';

// 👉 Passe à true après avoir déposé une vraie photo dans assets/seer.png.
const USE_PHOTO = true;
// eslint-disable-next-line @typescript-eslint/no-require-imports
const PHOTO = USE_PHOTO ? require('../../assets/seer.png') : null;

type Props = {
  size?: number;
  /** Affiche le cadre doré + halo autour (true par défaut). */
  framed?: boolean;
};

export function SeerAvatar({ size = 140, framed = true }: Props) {
  const ring = Math.max(2, size * 0.02);

  const inner = PHOTO ? (
    <Image source={PHOTO} style={{ width: size, height: size, borderRadius: size / 2 }} resizeMode="cover" />
  ) : (
    <SeerIllustration size={size} />
  );

  if (!framed) return inner;

  // Cadre premium : anneau doré + légère ombre dorée (halo).
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        borderWidth: ring,
        borderColor: brand.gold,
        overflow: 'hidden',
        backgroundColor: '#1A1430',
        // Halo doré (web + natif).
        shadowColor: brand.gold,
        shadowOpacity: 0.5,
        shadowRadius: size * 0.12,
        shadowOffset: { width: 0, height: 0 },
        elevation: 8,
      }}
    >
      {inner}
    </View>
  );
}

/**
 * Illustration vectorielle élégante (visuel d'attente avant la vraie photo).
 * Voyante moderne : caftan, foulard fluide, bijou de front, fond étoilé.
 */
function SeerIllustration({ size }: { size: number }) {
  const skin = '#E7B98F';
  const skinShade = '#CFA075';
  const veil = '#3A2A6D'; // violet profond
  const veilLight = '#5B47A8';
  const caftan = '#2A2552';

  return (
    <Svg width={size} height={size} viewBox="0 0 200 200">
      <Defs>
        <LinearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0%" stopColor="#1B1740" />
          <Stop offset="55%" stopColor="#2A2255" />
          <Stop offset="100%" stopColor="#3A2A6D" />
        </LinearGradient>
        <RadialGradient id="glow" cx="50%" cy="42%" r="55%">
          <Stop offset="0%" stopColor={brand.gold} stopOpacity={0.4} />
          <Stop offset="100%" stopColor={brand.gold} stopOpacity={0} />
        </RadialGradient>
        <LinearGradient id="veilG" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0%" stopColor={veilLight} />
          <Stop offset="100%" stopColor={veil} />
        </LinearGradient>
      </Defs>

      {/* Fond mystique bleu nuit → violet */}
      <Circle cx={100} cy={100} r={100} fill="url(#bg)" />
      {/* Lune douce */}
      <Circle cx={150} cy={48} r={16} fill="#F4E9C8" fillOpacity={0.9} />
      <Circle cx={144} cy={44} r={14} fill="#2A2255" />
      {/* Étoiles */}
      <G fill="#FCEFC7">
        <Star cx={36} cy={40} r={2.4} />
        <Star cx={58} cy={26} r={1.6} />
        <Star cx={168} cy={92} r={1.8} />
        <Star cx={28} cy={104} r={1.6} />
        <Star cx={176} cy={140} r={2} />
        <Star cx={48} cy={150} r={1.5} />
      </G>
      {/* Lueur dorée derrière le visage */}
      <Circle cx={100} cy={90} r={70} fill="url(#glow)" />

      {/* Buste / caftan élégant */}
      <Path d="M40 200 Q44 152 100 150 Q156 152 160 200 Z" fill={caftan} />
      {/* Col brodé doré du caftan */}
      <Path d="M82 156 Q100 176 118 156" fill="none" stroke={brand.gold} strokeWidth={3} strokeLinecap="round" />
      <Path d="M88 162 Q100 174 112 162" fill="none" stroke={brand.gold} strokeWidth={1.6} strokeOpacity={0.7} />

      {/* Foulard / voile fluide (violet dégradé) */}
      <Path
        d="M55 78 Q54 30 100 27 Q146 30 145 78 Q150 120 128 140 L72 140 Q50 120 55 78 Z"
        fill="url(#veilG)"
      />
      {/* Drapé du voile sur les épaules */}
      <Path d="M62 130 Q50 150 52 178 Q64 150 74 138 Z" fill={veil} />
      <Path d="M138 130 Q150 150 148 178 Q136 150 126 138 Z" fill={veil} />
      {/* Liseré doré du foulard */}
      <Path d="M55 78 Q54 30 100 27 Q146 30 145 78" fill="none" stroke={brand.gold} strokeWidth={2.5} strokeOpacity={0.85} />

      {/* Visage (traits naturels, doux) */}
      <Ellipse cx={100} cy={92} rx={34} ry={40} fill={skin} />
      <Path d="M100 56 Q74 62 73 98 Q75 124 100 132 Q90 96 100 56 Z" fill={skinShade} fillOpacity={0.22} />

      {/* Mèche de cheveux brune élégante */}
      <Path d="M70 70 Q76 92 70 110 Q66 90 66 76 Z" fill="#3A2A22" />
      <Path d="M130 70 Q124 92 130 110 Q134 90 134 76 Z" fill="#3A2A22" />

      {/* Sourcils fins */}
      <Path d="M81 82 Q89 79 96 82" stroke="#5B4636" strokeWidth={2.4} strokeLinecap="round" fill="none" />
      <Path d="M104 82 Q111 79 119 82" stroke="#5B4636" strokeWidth={2.4} strokeLinecap="round" fill="none" />

      {/* Yeux chaleureux (regard rassurant + mystérieux) */}
      <Ellipse cx={89} cy={91} rx={6.5} ry={4.2} fill="#FFFFFF" />
      <Ellipse cx={111} cy={91} rx={6.5} ry={4.2} fill="#FFFFFF" />
      <Circle cx={89} cy={91} r={3} fill="#5A3B2A" />
      <Circle cx={111} cy={91} r={3} fill="#5A3B2A" />
      <Circle cx={90.2} cy={90} r={1} fill="#FFFFFF" />
      <Circle cx={112.2} cy={90} r={1} fill="#FFFFFF" />
      {/* Trait d'eye-liner discret */}
      <Path d="M82 89 Q89 86 96 89" stroke="#3A2A22" strokeWidth={1.2} fill="none" strokeOpacity={0.7} />
      <Path d="M104 89 Q111 86 118 89" stroke="#3A2A22" strokeWidth={1.2} fill="none" strokeOpacity={0.7} />

      {/* Nez fin */}
      <Path d="M100 95 q-2.5 7 -3.5 11 q3.5 2.5 7 0" stroke={skinShade} strokeWidth={1.8} fill="none" strokeLinecap="round" />

      {/* Joues + sourire bienveillant */}
      <Circle cx={80} cy={104} r={5} fill="#E0917A" fillOpacity={0.35} />
      <Circle cx={120} cy={104} r={5} fill="#E0917A" fillOpacity={0.35} />
      <Path d="M89 116 Q100 124 111 116" stroke="#A84C3D" strokeWidth={2.8} strokeLinecap="round" fill="none" />

      {/* Bijou de front (or + pierre) */}
      <Path d="M100 58 l3 4 l-3 4 l-3 -4 Z" fill={brand.gold} />
      <Circle cx={100} cy={62} r={1.6} fill="#7AD0FF" />
      <Path d="M96 56 q4 -4 8 0" stroke={brand.gold} strokeWidth={1.4} fill="none" />

      {/* Boucles d'oreilles dorées élégantes */}
      <Circle cx={66} cy={108} r={3} fill={brand.gold} />
      <Path d="M66 111 q0 7 0 9" stroke={brand.gold} strokeWidth={2} />
      <Circle cx={66} cy={122} r={2.4} fill={brand.gold} />
      <Circle cx={134} cy={108} r={3} fill={brand.gold} />
      <Path d="M134 111 q0 7 0 9" stroke={brand.gold} strokeWidth={2} />
      <Circle cx={134} cy={122} r={2.4} fill={brand.gold} />

      {/* Collier fin */}
      <Path d="M86 150 Q100 162 114 150" fill="none" stroke={brand.gold} strokeWidth={1.6} strokeOpacity={0.9} />
      <Circle cx={100} cy={159} r={2.2} fill={brand.gold} />
    </Svg>
  );
}

// Petite étoile à 4 branches.
function Star({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  const d = `M${cx} ${cy - r} L${cx + r * 0.3} ${cy - r * 0.3} L${cx + r} ${cy} L${cx + r * 0.3} ${cy + r * 0.3} L${cx} ${cy + r} L${cx - r * 0.3} ${cy + r * 0.3} L${cx - r} ${cy} L${cx - r * 0.3} ${cy - r * 0.3} Z`;
  return <Path d={d} />;
}
