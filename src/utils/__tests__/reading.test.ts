import { describe, it, expect } from '@jest/globals';
import { buildSoloReading, buildCoupleReading } from '../reading';
import { computeCoupleResult, computeSoloResult } from '../compatibility';
import { LOCALES } from '@/locales';
import type { Answers } from '../questions';

const ar = LOCALES.ar;

const soloAnswers: Answers = {
  name: 'ياسمين',
  birth: new Date(1995, 6, 25).toISOString(), // Leo / feu
  birthTime: 'morning',
  gender: 'female',
  status: 'single',
  socialEnergy: 'extrovert',
  decision: 'heart',
  strength: 'kind',
  flaw: 'overthink',
  rhythm: 'morning',
  socialPref: 'circle',
  hobby: 'art',
  coreValue: 'family',
  lifeGoal: 'impact',
  stress: 'talk',
  loveStyle: 'calm',
  lovePast: 'onebig',
  wantPartner: 'loyal',
  fear: 'betrayal',
  wantKids: 'yes',
  dream: 'travel',
  futureVision: 'optimist',
  yearWish: 'theone',
  element: 'fire',
  animal: 'lion',
  color: 'red',
  dreamPlace: 'beach',
};

const coupleAnswers: Answers = {
  name: 'سلمى',
  partnerName: 'كريم',
  birth: new Date(1995, 6, 25).toISOString(),
  partnerBirth: new Date(1996, 3, 25).toISOString(),
  birthTime: 'night',
  howLong: 'years',
  trust: 'total',
  affection: 'words',
  loveLang: 'words',
  conflict: 'talk',
  firstStep: 'both',
  decide: 'together',
  admire: 'heart',
  challenge: 'routine',
  sharedDream: 'home',
  element: 'fire',
  season: 'spring',
  dreamPlace: 'beach',
  project: 'marriage',
};

describe('buildSoloReading', () => {
  const res = computeSoloResult(soloAnswers);

  it('produit un rapport long, immersif (≥ 9 aspects) + archétype + outro', () => {
    const r = buildSoloReading(res, soloAnswers, ar);
    expect(r.intro).toContain('ياسمين');
    expect(r.aspects.length).toBeGreaterThanOrEqual(9); // rapport détaillé
    expect(r.archetypeName).toBeTruthy();
    expect(r.outro).toContain('ياسمين');
    for (const a of r.aspects) expect(a.text.trim().length).toBeGreaterThan(0);
  });

  it('reflète les réponses (la peur choisie apparaît dans le rapport)', () => {
    const r = buildSoloReading(res, soloAnswers, ar);
    const all = r.aspects.map((a) => a.text).join(' ');
    expect(all).toContain(ar.readings.fearRead.betrayal);
    expect(all).toContain(ar.readings.coreValueRead.family);
    expect(all).toContain(ar.readings.stressRead.talk);
  });

  it('est déterministe', () => {
    const a = buildSoloReading(res, soloAnswers, ar);
    const b = buildSoloReading(res, soloAnswers, ar);
    expect(JSON.stringify(a)).toBe(JSON.stringify(b));
  });

  it('ignore proprement les réponses manquantes', () => {
    const r = buildSoloReading(res, { name: 'تست', birth: soloAnswers.birth }, ar);
    // Pas de crash, et tous les aspects affichés ont du texte.
    for (const a of r.aspects) expect(a.text.trim().length).toBeGreaterThan(0);
  });
});

describe('buildCoupleReading', () => {
  const res = computeCoupleResult(coupleAnswers);

  it('produit un rapport couple riche (≥ 5 aspects) + archétype + outro', () => {
    const r = buildCoupleReading(res, coupleAnswers, ar);
    expect(r.intro).toContain('سلمى');
    expect(r.intro).toContain('كريم');
    expect(r.aspects.length).toBeGreaterThanOrEqual(5);
    expect(r.archetypeName).toBeTruthy();
    expect(r.outro).toContain('كريم');
  });

  it('reflète les réponses (défi, confiance, rêve commun)', () => {
    const r = buildCoupleReading(res, coupleAnswers, ar);
    const all = r.aspects.map((a) => a.text).join(' ');
    expect(all).toContain(ar.readings.challengeRead.routine);
    expect(all).toContain(ar.readings.trustRead.total);
    expect(all).toContain(ar.readings.sharedDreamRead.home);
  });

  it('est déterministe', () => {
    const a = buildCoupleReading(res, coupleAnswers, ar);
    const b = buildCoupleReading(res, coupleAnswers, ar);
    expect(JSON.stringify(a)).toBe(JSON.stringify(b));
  });
});
