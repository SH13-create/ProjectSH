/**
 * 💞 Cœur logique de l'app : calcul du score de compatibilité (mode couple)
 * et préparation de la lecture (mode individuel).
 *
 * IMPORTANT : tout est DÉTERMINISTE. Les mêmes réponses donnent toujours
 * exactement le même résultat (aucun Math.random()).
 */
import type { Answers, Mode } from './questions';
import {
  getAge,
  getZodiacInfo,
  getZodiacSign,
  type Element,
  type ZodiacSign,
} from './zodiac';

export type ElementRelation = 'same' | 'friendly' | 'neutral' | 'tense';

export type CoupleResult = {
  mode: 'couple';
  score: number;
  bandIndex: 0 | 1 | 2 | 3 | 4;
  name1: string;
  name2: string;
  sign1: ZodiacSign;
  sign2: ZodiacSign;
  element1: Element;
  element2: Element;
  chemistry: ElementRelation;
};

export type SoloResult = {
  mode: 'solo';
  name: string;
  sign: ZodiacSign;
  element: Element;
  age: number;
};

export type Result = CoupleResult | SoloResult;

/** Petit hash déterministe (variante de djb2) → entier positif. */
function hashString(str: string): number {
  let h = 5381;
  for (let i = 0; i < str.length; i++) {
    h = (h * 33) ^ str.charCodeAt(i);
  }
  return Math.abs(h);
}

/** Relation entre deux éléments selon l'astrologie classique. */
export function elementRelation(a: Element, b: Element): ElementRelation {
  if (a === b) return 'same';
  const key = [a, b].sort().join('-');
  const friendly = ['air-fire', 'earth-water'];
  const tense = ['fire-water', 'air-earth'];
  if (friendly.includes(key)) return 'friendly';
  if (tense.includes(key)) return 'tense';
  return 'neutral'; // fire-earth, air-water
}

const RELATION_BASE: Record<ElementRelation, number> = {
  friendly: 88,
  same: 82,
  neutral: 68,
  tense: 58,
};

function parseDate(iso?: string): Date {
  const d = iso ? new Date(iso) : new Date(2000, 0, 1);
  return isNaN(d.getTime()) ? new Date(2000, 0, 1) : d;
}

function bandFromScore(score: number): 0 | 1 | 2 | 3 | 4 {
  if (score >= 90) return 4;
  if (score >= 78) return 3;
  if (score >= 64) return 2;
  if (score >= 50) return 1;
  return 0;
}

/** Calcule le résultat couple à partir des réponses. */
export function computeCoupleResult(answers: Answers): CoupleResult {
  const sign1 = getZodiacSign(parseDate(answers.birth));
  const sign2 = getZodiacSign(parseDate(answers.partnerBirth));
  const e1 = getZodiacInfo(sign1).element;
  const e2 = getZodiacInfo(sign2).element;
  const chemistry = elementRelation(e1, e2);

  let score = RELATION_BASE[chemistry];

  // L'élément préféré renforce le lien s'il correspond à l'un des deux signes.
  if (answers.element === e1) score += 4;
  if (answers.element === e2) score += 4;

  // Un projet de mariage = intention romantique forte.
  if (answers.project === 'marriage') score += 4;
  if (answers.project === 'travel') score += 2;

  // Statut de la relation : un couple déjà ensemble part avec un petit plus.
  if (answers.status === 'relationship' || answers.status === 'married') score += 3;

  // Variation déterministe propre au couple (mêmes prénoms+signes = même valeur).
  const seed = hashString(`${answers.name}|${answers.partnerName}|${sign1}|${sign2}|${answers.color}`);
  const jitter = (seed % 13) - 6; // -6 .. +6
  score += jitter;

  score = Math.max(35, Math.min(99, Math.round(score)));

  return {
    mode: 'couple',
    score,
    bandIndex: bandFromScore(score),
    name1: answers.name || '—',
    name2: answers.partnerName || '—',
    sign1,
    sign2,
    element1: e1,
    element2: e2,
    chemistry,
  };
}

/** Prépare le résultat individuel à partir des réponses. */
export function computeSoloResult(answers: Answers): SoloResult {
  const birth = parseDate(answers.birth);
  const sign = getZodiacSign(birth);
  return {
    mode: 'solo',
    name: answers.name || '—',
    sign,
    element: getZodiacInfo(sign).element,
    age: getAge(birth),
  };
}

export function computeResult(mode: Mode, answers: Answers): Result {
  return mode === 'couple' ? computeCoupleResult(answers) : computeSoloResult(answers);
}
