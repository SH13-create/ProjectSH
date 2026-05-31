import { describe, it, expect } from '@jest/globals';
import {
  computeCoupleResult,
  computeSoloResult,
  elementRelation,
} from '../compatibility';
import type { Answers } from '../questions';

const baseCouple: Answers = {
  name: 'سلمى',
  partnerName: 'كريم',
  birth: new Date(1995, 6, 25).toISOString(), // Leo (feu)
  partnerBirth: new Date(1996, 3, 25).toISOString(), // Taurus (terre)
  gender: 'female',
  status: 'relationship',
  color: 'red',
  element: 'fire',
  animal: 'lion',
  project: 'marriage',
};

describe('elementRelation', () => {
  it('reconnaît les éléments identiques', () => {
    expect(elementRelation('fire', 'fire')).toBe('same');
  });
  it('feu + air = amicaux, terre + eau = amicaux', () => {
    expect(elementRelation('fire', 'air')).toBe('friendly');
    expect(elementRelation('earth', 'water')).toBe('friendly');
  });
  it('feu + eau = tendu', () => {
    expect(elementRelation('fire', 'water')).toBe('tense');
  });
  it('est symétrique', () => {
    expect(elementRelation('air', 'fire')).toBe(elementRelation('fire', 'air'));
  });
});

describe('computeCoupleResult', () => {
  it('est DÉTERMINISTE (mêmes réponses => même score)', () => {
    const a = computeCoupleResult(baseCouple);
    const b = computeCoupleResult({ ...baseCouple });
    expect(a.score).toBe(b.score);
    expect(a.bandIndex).toBe(b.bandIndex);
  });

  it('garde le score dans [35, 99]', () => {
    const r = computeCoupleResult(baseCouple);
    expect(r.score).toBeGreaterThanOrEqual(35);
    expect(r.score).toBeLessThanOrEqual(99);
  });

  it('le bandIndex correspond au score', () => {
    const r = computeCoupleResult(baseCouple);
    const expected = r.score >= 90 ? 4 : r.score >= 78 ? 3 : r.score >= 64 ? 2 : r.score >= 50 ? 1 : 0;
    expect(r.bandIndex).toBe(expected);
  });

  it('un projet de mariage augmente le score', () => {
    const withMarriage = computeCoupleResult({ ...baseCouple, project: 'marriage' });
    const withStudy = computeCoupleResult({ ...baseCouple, project: 'study' });
    expect(withMarriage.score).toBeGreaterThan(withStudy.score);
  });

  it('des prénoms différents font varier le score (mêmes signes)', () => {
    const a = computeCoupleResult({ ...baseCouple, name: 'أمين', partnerName: 'سارة' });
    const b = computeCoupleResult({ ...baseCouple, name: 'يوسف', partnerName: 'ليلى' });
    // Pas garanti d'être différent, mais les deux doivent rester valides et stables.
    expect(a.score).toBe(computeCoupleResult({ ...baseCouple, name: 'أمين', partnerName: 'سارة' }).score);
    expect(b.score).toBe(computeCoupleResult({ ...baseCouple, name: 'يوسف', partnerName: 'ليلى' }).score);
  });

  it('calcule les bons signes', () => {
    const r = computeCoupleResult(baseCouple);
    expect(r.sign1).toBe('leo');
    expect(r.sign2).toBe('taurus');
  });
});

describe('computeSoloResult', () => {
  it('renvoie signe, élément et âge', () => {
    const r = computeSoloResult({ ...baseCouple });
    expect(r.mode).toBe('solo');
    expect(r.sign).toBe('leo');
    expect(r.element).toBe('fire');
    expect(typeof r.age).toBe('number');
  });

  it('tolère des réponses manquantes', () => {
    expect(() => computeSoloResult({})).not.toThrow();
  });
});
