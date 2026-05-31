import { describe, it, expect } from '@jest/globals';
import { getZodiacSign, getAge, getZodiacInfo, ZODIAC } from '../zodiac';

describe('getZodiacSign', () => {
  // Cas par signe : une date clairement à l'intérieur de chaque période.
  const cases: Array<[number, number, string]> = [
    [1, 5, 'capricorn'], // 5 jan
    [1, 25, 'aquarius'], // 25 jan
    [2, 25, 'pisces'],
    [3, 25, 'aries'],
    [4, 25, 'taurus'],
    [5, 25, 'gemini'],
    [6, 25, 'cancer'],
    [7, 25, 'leo'],
    [8, 25, 'virgo'],
    [9, 25, 'libra'],
    [10, 25, 'scorpio'],
    [11, 25, 'sagittarius'],
    [12, 25, 'capricorn'],
  ];

  it.each(cases)('mois %i jour %i => %s', (month, day, expected) => {
    expect(getZodiacSign(new Date(1995, month - 1, day))).toBe(expected);
  });

  it('gère les bornes de période (21 mars = Bélier)', () => {
    expect(getZodiacSign(new Date(2000, 2, 21))).toBe('aries');
    expect(getZodiacSign(new Date(2000, 2, 20))).toBe('pisces');
  });

  it('est déterministe', () => {
    const d = new Date(1990, 6, 15);
    expect(getZodiacSign(d)).toBe(getZodiacSign(new Date(1990, 6, 15)));
  });
});

describe('getAge', () => {
  it("calcule l'âge correctement", () => {
    const now = new Date(2026, 4, 31); // 31 mai 2026
    expect(getAge(new Date(2000, 0, 1), now)).toBe(26);
    expect(getAge(new Date(2000, 11, 31), now)).toBe(25); // anniversaire pas encore passé
  });

  it("ne renvoie jamais d'âge négatif", () => {
    const now = new Date(2000, 0, 1);
    expect(getAge(new Date(2010, 0, 1), now)).toBeGreaterThanOrEqual(0);
  });
});

describe('ZODIAC', () => {
  it('contient 12 signes avec un élément valide', () => {
    expect(ZODIAC).toHaveLength(12);
    for (const z of ZODIAC) {
      expect(['fire', 'earth', 'air', 'water']).toContain(z.element);
      expect(getZodiacInfo(z.key).key).toBe(z.key);
    }
  });
});
