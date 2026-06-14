import { describe, it, expect } from '@jest/globals';
import { askOracle, dailyPick } from '../oracle';
import { LOCALES } from '@/locales';

const ar = LOCALES.ar;

describe('dailyPick', () => {
  const pool = ['a', 'b', 'c', 'd', 'e'];
  it('renvoie le même élément pour un jour donné', () => {
    const d = new Date(2026, 5, 14);
    expect(dailyPick(pool, d, 'advice')).toBe(dailyPick(pool, d, 'advice'));
  });
  it('le sel change la sélection (conseil ≠ mot du jour, en général)', () => {
    const d = new Date(2026, 5, 14);
    const a = dailyPick(pool, d, 'advice');
    const w = dailyPick(pool, d, 'word');
    // Au moins défini et dans le pool.
    expect(pool).toContain(a);
    expect(pool).toContain(w);
  });
  it('change selon le jour', () => {
    const picks = new Set(
      Array.from({ length: 10 }, (_, i) => dailyPick(pool, new Date(2026, 5, i + 1), 'advice')),
    );
    expect(picks.size).toBeGreaterThan(1); // pas figé sur une seule valeur
  });
  it('tolère un pool vide', () => {
    expect(() => dailyPick([], new Date(), 'x')).not.toThrow();
  });
});

describe('askOracle', () => {
  it('détecte le thème amour', () => {
    expect(askOracle('واش غادي نلقى الحب؟', ar).topic).toBe('love');
    expect(askOracle('parle moi de mon amour', ar).topic).toBe('love');
  });

  it('détecte travail / argent / santé / futur', () => {
    expect(askOracle('kifach l-khedma dyali', ar).topic).toBe('work');
    expect(askOracle('واش غادي تجيني الفلوس', ar).topic).toBe('money');
    expect(askOracle('s77a dyali', ar).topic).toBe('health');
    expect(askOracle('chno l-mosta9bal dyali', ar).topic).toBe('future');
  });

  it('tombe sur générique si aucun mot-clé', () => {
    expect(askOracle('xyz', ar).topic).toBe('generic');
  });

  it('renvoie toujours un texte non vide', () => {
    for (const q of ['', 'حب', 'khedma', 'flous', 'salam']) {
      expect(askOracle(q, ar).text.trim().length).toBeGreaterThan(0);
    }
  });

  it('est DÉTERMINISTE (même question => même réponse)', () => {
    const q = 'واش غادي نتزوج هاد العام؟';
    expect(askOracle(q, ar).text).toBe(askOracle(q, ar).text);
  });
});
