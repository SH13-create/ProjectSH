/**
 * 🗣️ LiveSeer — mascotte ANIMÉE de Moulat Niya (personnage « vivant »).
 *
 * Sans aucune API externe : tout est dessiné en SVG et animé avec l'état React
 * + reanimated. Quand `speaking` est vrai (= l'audio joue), la BOUCHE s'anime
 * (ouverture/fermeture façon parole) ; les YEUX CLIGNENT régulièrement ; la TÊTE
 * a un léger balancement permanent. La synchro audio↔animation se fait via le
 * prop `speaking`, piloté par les callbacks onStart/onDone de la synthèse vocale.
 *
 * 👉 Donne l'impression que le personnage parle réellement.
 */
import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
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
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { brand } from '@/theme';

type Props = {
  size?: number;
  speaking?: boolean;
  framed?: boolean;
};

export function LiveSeer({ size = 140, speaking = false, framed = true }: Props) {
  // Ouverture de la bouche (0 = fermée, 1 = grande ouverte) et des yeux
  // (1 = ouverts, 0 = fermés le temps d'un clignement).
  const [mouth, setMouth] = useState(0);
  const [eye, setEye] = useState(1);
  const mouthRef = useRef(0);

  // --- Animation de la BOUCHE, synchronisée avec l'audio (speaking) ----------
  useEffect(() => {
    let raf: ReturnType<typeof setInterval> | null = null;
    if (speaking) {
      const start = Date.now();
      raf = setInterval(() => {
        const t = (Date.now() - start) / 1000;
        // Superposition de sinusoïdes -> variation « naturelle » de la parole.
        const v = 0.5 + 0.32 * Math.sin(t * 11) + 0.18 * Math.sin(t * 19 + 1);
        const target = Math.max(0, Math.min(1, v));
        mouthRef.current = target;
        setMouth(target);
      }, 60);
    } else {
      // Fermeture douce de la bouche quand l'audio s'arrête.
      const close = setInterval(() => {
        mouthRef.current = Math.max(0, mouthRef.current - 0.2);
        setMouth(mouthRef.current);
        if (mouthRef.current <= 0.01 && close) clearInterval(close);
      }, 50);
      return () => clearInterval(close);
    }
    return () => {
      if (raf) clearInterval(raf);
    };
  }, [speaking]);

  // --- CLIGNEMENT des yeux (toujours actif, cadence naturelle) ----------------
  useEffect(() => {
    let alive = true;
    let timer: ReturnType<typeof setTimeout>;
    const scheduleBlink = () => {
      const delay = 2400 + Math.random() * 2600; // 2,4 – 5 s entre deux clignements
      timer = setTimeout(() => {
        if (!alive) return;
        // Fermeture (~70ms) puis réouverture (~90ms).
        setEye(0.15);
        setTimeout(() => alive && setEye(0), 60);
        setTimeout(() => alive && setEye(1), 150);
        scheduleBlink();
      }, delay);
    };
    scheduleBlink();
    return () => {
      alive = false;
      clearTimeout(timer);
    };
  }, []);

  // --- Léger MOUVEMENT DE TÊTE (balancement permanent) ------------------------
  const sway = useSharedValue(0);
  useEffect(() => {
    sway.value = withRepeat(
      withTiming(1, { duration: 2600, easing: Easing.inOut(Easing.sin) }),
      -1,
      true,
    );
  }, []);
  const headStyle = useAnimatedStyle(() => {
    const s = sway.value * 2 - 1; // -1 .. 1
    return {
      transform: [{ translateX: s * 2.5 }, { rotateZ: `${s * 2}deg` }, { translateY: Math.abs(s) * -1.5 }],
    };
  });

  const ring = Math.max(2, size * 0.02);

  const content = (
    <Animated.View style={headStyle}>
      <Face size={size} mouth={mouth} eye={eye} />
    </Animated.View>
  );

  if (!framed) return content;

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
        shadowColor: brand.gold,
        shadowOpacity: 0.5,
        shadowRadius: size * 0.12,
        shadowOffset: { width: 0, height: 0 },
        elevation: 8,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {content}
    </View>
  );
}

/** Le visage SVG, paramétré par l'ouverture de la bouche et des yeux. */
function Face({ size, mouth, eye }: { size: number; mouth: number; eye: number }) {
  const skin = '#E7B98F';
  const skinShade = '#CFA075';
  const veil = '#3A2A6D';
  const veilLight = '#5B47A8';

  // Géométrie animée
  const eyeRy = 1 + 3.6 * eye; // hauteur de l'œil (clignement)
  const pupilOp = eye; // pupille cachée quand l'œil est fermé
  const mouthRy = 1.2 + 7 * mouth; // ouverture verticale de la bouche
  const teethOp = mouth > 0.45 ? 0.9 : 0; // dents visibles quand bien ouverte

  return (
    <Svg width={size} height={size} viewBox="0 0 200 200">
      <Defs>
        <LinearGradient id="lsbg" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0%" stopColor="#1B1740" />
          <Stop offset="55%" stopColor="#2A2255" />
          <Stop offset="100%" stopColor="#3A2A6D" />
        </LinearGradient>
        <RadialGradient id="lsglow" cx="50%" cy="42%" r="55%">
          <Stop offset="0%" stopColor={brand.gold} stopOpacity={0.4} />
          <Stop offset="100%" stopColor={brand.gold} stopOpacity={0} />
        </RadialGradient>
        <LinearGradient id="lsveil" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0%" stopColor={veilLight} />
          <Stop offset="100%" stopColor={veil} />
        </LinearGradient>
      </Defs>

      {/* Fond mystique + lune + étoiles + lueur */}
      <Circle cx={100} cy={100} r={100} fill="url(#lsbg)" />
      <Circle cx={150} cy={48} r={15} fill="#F4E9C8" fillOpacity={0.9} />
      <Circle cx={144} cy={45} r={13} fill="#2A2255" />
      <G fill="#FCEFC7">
        <Circle cx={36} cy={42} r={1.8} />
        <Circle cx={60} cy={28} r={1.3} />
        <Circle cx={170} cy={96} r={1.6} />
        <Circle cx={30} cy={108} r={1.4} />
        <Circle cx={176} cy={142} r={1.7} />
      </G>
      <Circle cx={100} cy={92} r={70} fill="url(#lsglow)" />

      {/* Buste / caftan */}
      <Path d="M40 200 Q44 152 100 150 Q156 152 160 200 Z" fill="#2A2552" />
      <Path d="M82 156 Q100 176 118 156" fill="none" stroke={brand.gold} strokeWidth={3} strokeLinecap="round" />

      {/* Voile */}
      <Path d="M55 78 Q54 30 100 27 Q146 30 145 78 Q150 120 128 140 L72 140 Q50 120 55 78 Z" fill="url(#lsveil)" />
      <Path d="M62 130 Q50 150 52 178 Q64 150 74 138 Z" fill={veil} />
      <Path d="M138 130 Q150 150 148 178 Q136 150 126 138 Z" fill={veil} />
      <Path d="M55 78 Q54 30 100 27 Q146 30 145 78" fill="none" stroke={brand.gold} strokeWidth={2.5} strokeOpacity={0.85} />

      {/* Visage */}
      <Ellipse cx={100} cy={92} rx={34} ry={40} fill={skin} />
      <Path d="M100 56 Q74 62 73 98 Q75 124 100 132 Q90 96 100 56 Z" fill={skinShade} fillOpacity={0.22} />

      {/* Mèches */}
      <Path d="M70 70 Q76 92 70 110 Q66 90 66 76 Z" fill="#3A2A22" />
      <Path d="M130 70 Q124 92 130 110 Q134 90 134 76 Z" fill="#3A2A22" />

      {/* Sourcils */}
      <Path d="M81 82 Q89 79 96 82" stroke="#5B4636" strokeWidth={2.4} strokeLinecap="round" fill="none" />
      <Path d="M104 82 Q111 79 119 82" stroke="#5B4636" strokeWidth={2.4} strokeLinecap="round" fill="none" />

      {/* Yeux (clignement via eyeRy + opacité pupille) */}
      <Ellipse cx={89} cy={91} rx={6.5} ry={eyeRy} fill="#FFFFFF" />
      <Ellipse cx={111} cy={91} rx={6.5} ry={eyeRy} fill="#FFFFFF" />
      <Circle cx={89} cy={91} r={3} fill="#5A3B2A" opacity={pupilOp} />
      <Circle cx={111} cy={91} r={3} fill="#5A3B2A" opacity={pupilOp} />
      <Circle cx={90.2} cy={90} r={1} fill="#FFFFFF" opacity={pupilOp} />
      <Circle cx={112.2} cy={90} r={1} fill="#FFFFFF" opacity={pupilOp} />
      {/* Paupière (trait) quand l'œil se ferme */}
      <Path d="M82.5 91 Q89 91 95.5 91" stroke="#3A2A22" strokeWidth={1.4} strokeLinecap="round" opacity={1 - eye} />
      <Path d="M104.5 91 Q111 91 117.5 91" stroke="#3A2A22" strokeWidth={1.4} strokeLinecap="round" opacity={1 - eye} />

      {/* Nez */}
      <Path d="M100 95 q-2.5 7 -3.5 11 q3.5 2.5 7 0" stroke={skinShade} strokeWidth={1.8} fill="none" strokeLinecap="round" />

      {/* Joues */}
      <Circle cx={80} cy={104} r={5} fill="#E0917A" fillOpacity={0.35} />
      <Circle cx={120} cy={104} r={5} fill="#E0917A" fillOpacity={0.35} />

      {/* BOUCHE animée : lèvres + intérieur qui s'ouvre + dents */}
      <Ellipse cx={100} cy={119} rx={9} ry={mouthRy} fill="#7B3B3B" />
      <Ellipse cx={100} cy={117} rx={6.5} ry={mouthRy * 0.4} fill="#FFFFFF" opacity={teethOp} />
      {/* Lèvre supérieure (légère) */}
      <Path d="M90 116 Q100 113 110 116" stroke="#A84C3D" strokeWidth={2.4} strokeLinecap="round" fill="none" />
      {/* Lèvre inférieure suit l'ouverture */}
      <Path
        d={`M90 ${118 + mouthRy * 0.5} Q100 ${122 + mouthRy} 110 ${118 + mouthRy * 0.5}`}
        stroke="#A84C3D"
        strokeWidth={2.6}
        strokeLinecap="round"
        fill="none"
      />

      {/* Bijou de front */}
      <Path d="M100 58 l3 4 l-3 4 l-3 -4 Z" fill={brand.gold} />
      <Circle cx={100} cy={62} r={1.6} fill="#7AD0FF" />

      {/* Boucles d'oreilles */}
      <Circle cx={66} cy={108} r={3} fill={brand.gold} />
      <Circle cx={66} cy={120} r={2.4} fill={brand.gold} />
      <Circle cx={134} cy={108} r={3} fill={brand.gold} />
      <Circle cx={134} cy={120} r={2.4} fill={brand.gold} />
    </Svg>
  );
}
