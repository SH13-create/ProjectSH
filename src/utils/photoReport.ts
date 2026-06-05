/**
 * 📸 Mode « Analyse par photo » de Moulat Niya — 100% FICTIF & LOCAL.
 *
 * ⚠️ AUCUNE reconnaissance faciale, AUCUN envoi réseau. On dérive un rapport
 * ludique et DÉTERMINISTE à partir d'une « empreinte » de chaque photo
 * (sa taille + son URI). Les mêmes photos donnent toujours le même rapport.
 *
 * Tout est présenté comme du DIVERTISSEMENT inspiré des photos, jamais comme
 * un fait réel ou scientifique.
 */
import type { Strings } from '@/locales';
import { format } from '@/locales';

export type PhotoInput = {
  uri: string;
  // Métadonnées neutres (jamais le contenu du visage) pour varier le résultat.
  width?: number;
  height?: number;
  fileSize?: number;
};

export type ChildPrediction = {
  emoji: string;
  gender: 'boy' | 'girl';
  name: string; // petit surnom mignon
  face: string;
  eyes: string;
  hair: string;
  smile: string;
  skin: string;
  resembles: string; // parent 1 / parent 2
  trait: string;
  imagePrompt: string; // prompt prêt à coller dans un générateur d'images
};

export type PhotoReport = {
  intro: string; // parole d'intro de Moulat Niya
  // Scores
  love: number;
  friendship: number;
  marriage: number;
  overall: number;
  // Analyse visuelle (fictive)
  visual1: string;
  visual2: string;
  resemblance: string;
  // Histoire
  meeting: string;
  bond: string;
  challenge: string;
  futureDream: string;
  // Famille
  childrenCount: number;
  children: ChildPrediction[];
  familyIntro: string;
  // Destin
  auraColor: string; // libellé localisé
  auraHex: string;
  luckyNumber: number;
  luckyDate: string;
  element: 'fire' | 'water' | 'earth' | 'air';
  romanticPrediction: string;
  // Conclusion
  verdict: string;
};

/** Hash déterministe (djb2) → entier positif. */
function hash(str: string): number {
  let h = 5381;
  for (let i = 0; i < str.length; i++) h = (h * 33) ^ str.charCodeAt(i);
  return Math.abs(h);
}

function fingerprint(p: PhotoInput): number {
  return hash(`${p.uri}|${p.width ?? 0}x${p.height ?? 0}|${p.fileSize ?? 0}`);
}

/** Tire un élément d'un tableau de façon déterministe. */
function at<T>(arr: T[], seed: number): T {
  return arr[seed % arr.length];
}

/** Met un score dans une fourchette « positive » et agréable (toujours ≥ 55). */
function niceScore(seed: number, min = 62, max = 99): number {
  return min + (seed % (max - min + 1));
}

/**
 * Construit le rapport complet à partir des 2 photos + des libellés localisés.
 */
export function buildPhotoReport(
  photo1: PhotoInput,
  photo2: PhotoInput,
  name1: string,
  name2: string,
  t: Strings,
): PhotoReport {
  const r = t.photo;
  const f1 = fingerprint(photo1);
  const f2 = fingerprint(photo2);
  const combo = hash(`${f1}-${f2}`);
  const N1 = name1.trim() || r.defaultName1;
  const N2 = name2.trim() || r.defaultName2;

  // --- Scores (toujours positifs et engageants) ---
  const love = niceScore(combo, 68, 99);
  const friendship = niceScore(hash(`fr${combo}`), 72, 99);
  const marriage = niceScore(hash(`mr${combo}`), 60, 98);
  const overall = Math.round((love + friendship + marriage) / 3);

  // --- Analyse visuelle (fictive, basée sur des "lectures d'énergie") ---
  const visual1 = format(at(r.visualPool, f1), { name: N1 });
  const visual2 = format(at(r.visualPool, f2 + 7), { name: N2 });
  const resemblance = at(r.resemblancePool, combo);

  // --- Histoire ---
  const meeting = format(at(r.meetingPool, combo), { n1: N1, n2: N2 });
  const bond = at(r.bondPool, hash(`b${combo}`));
  const challenge = at(r.challengePool, hash(`c${combo}`));
  const futureDream = at(r.futurePool, hash(`f${combo}`));

  // --- Famille (1 à 3 enfants) ---
  const childrenCount = 1 + (combo % 3); // 1..3
  const children: ChildPrediction[] = [];
  for (let i = 0; i < childrenCount; i++) {
    const cs = hash(`child${i}${combo}`);
    const gender: 'boy' | 'girl' = cs % 2 === 0 ? 'girl' : 'boy';
    const resemblesP1 = hash(`res${i}${combo}`) % 2 === 0;
    const face = at(r.childFace, cs);
    const eyes = at(r.childEyes, cs + 1);
    const hair = at(r.childHair, cs + 2);
    const smile = at(r.childSmile, cs + 3);
    const skin = at(r.childSkin, cs + 4);
    const trait = at(r.childTrait, cs + 5);
    const name = at(gender === 'girl' ? r.childGirlNames : r.childBoyNames, cs);
    const resembles = resemblesP1 ? N1 : N2;

    children.push({
      emoji: gender === 'girl' ? '👧' : '👦',
      gender,
      name,
      face,
      eyes,
      hair,
      smile,
      skin,
      resembles,
      trait,
      imagePrompt: format(r.childImagePrompt, {
        gender: gender === 'girl' ? r.genderGirlWord : r.genderBoyWord,
        eyes,
        hair,
        skin,
        smile,
      }),
    });
  }

  // --- Destin ---
  const aura = at(r.auraPool, hash(`a${combo}`));
  const luckyNumber = 1 + (combo % 9); // 1..9
  const luckyMonth = 1 + (hash(`lm${combo}`) % 12);
  const luckyDay = 1 + (hash(`ld${combo}`) % 28);
  const elements: PhotoReport['element'][] = ['fire', 'water', 'earth', 'air'];
  const element = elements[combo % 4];
  const romanticPrediction = format(at(r.romanticPool, hash(`rp${combo}`)), { n1: N1, n2: N2 });

  return {
    intro: format(r.intro, { n1: N1, n2: N2 }),
    love,
    friendship,
    marriage,
    overall,
    visual1,
    visual2,
    resemblance,
    meeting,
    bond,
    challenge,
    futureDream,
    childrenCount,
    children,
    familyIntro: format(r.familyIntro, { count: String(childrenCount) }),
    auraColor: aura.label,
    auraHex: aura.hex,
    luckyNumber,
    luckyDate: `${luckyDay}/${luckyMonth}`,
    element,
    romanticPrediction,
    verdict: at(r.verdictPool, combo),
  };
}
