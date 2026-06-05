import { describe, it, expect } from '@jest/globals';
import { buildPhotoReport, type PhotoInput } from '../photoReport';
import { LOCALES } from '@/locales';

const t = LOCALES.ar;
const p1: PhotoInput = { uri: 'file:///a.jpg', width: 800, height: 800, fileSize: 12345 };
const p2: PhotoInput = { uri: 'file:///b.jpg', width: 600, height: 600, fileSize: 54321 };

describe('buildPhotoReport', () => {
  it('produit tous les blocs attendus', () => {
    const r = buildPhotoReport(p1, p2, 'سلمى', 'كريم', t);
    expect(r.intro).toContain('سلمى');
    expect(r.love).toBeGreaterThanOrEqual(55);
    expect(r.marriage).toBeLessThanOrEqual(99);
    expect(r.children.length).toBeGreaterThanOrEqual(1);
    expect(r.children.length).toBeLessThanOrEqual(3);
    for (const c of r.children) {
      expect(c.imagePrompt).toContain('photoréaliste');
      expect(c.face.length).toBeGreaterThan(0);
      expect(['سلمى', 'كريم']).toContain(c.resembles);
    }
    expect(r.luckyNumber).toBeGreaterThanOrEqual(1);
    expect(r.luckyNumber).toBeLessThanOrEqual(9);
    expect(['fire', 'water', 'earth', 'air']).toContain(r.element);
    expect(r.auraHex).toMatch(/^#[0-9A-Fa-f]{6}$/);
  });

  it('est DÉTERMINISTE (mêmes photos => même rapport)', () => {
    const a = buildPhotoReport(p1, p2, 'سلمى', 'كريم', t);
    const b = buildPhotoReport(p1, p2, 'سلمى', 'كريم', t);
    expect(JSON.stringify(a)).toBe(JSON.stringify(b));
  });

  it('change si on inverse les photos ou les noms', () => {
    const a = buildPhotoReport(p1, p2, 'سلمى', 'كريم', t);
    const b = buildPhotoReport(p2, p1, 'كريم', 'سلمى', t);
    // Au moins un champ diffère (ordre/empreintes différentes).
    expect(a.intro).not.toBe(b.intro);
  });

  it('tolère des prénoms vides (noms par défaut)', () => {
    const r = buildPhotoReport(p1, p2, '', '', t);
    expect(r.intro).toContain(t.photo.defaultName1);
  });
});
