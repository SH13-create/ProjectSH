import { describe, it, expect } from '@jest/globals';
import { askOracle } from '../oracle';
import { LOCALES } from '@/locales';

const ar = LOCALES.ar;

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
