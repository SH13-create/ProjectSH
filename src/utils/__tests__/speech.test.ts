import { describe, it, expect } from '@jest/globals';
import { cleanForSpeech } from '../speech';

describe('cleanForSpeech', () => {
  it('retire les emojis (pas de « croissant de lune » lu à voix haute)', () => {
    expect(cleanForSpeech('مرحبا بوليداتي! 🌙')).toBe('مرحبا بوليداتي!');
    expect(cleanForSpeech('النجوم معاك ✨')).toBe('النجوم معاك');
    expect(cleanForSpeech('💞🌙✨')).toBe('');
  });

  it('garde le texte arabe et la ponctuation utile', () => {
    const s = cleanForSpeech('واش غادي نلقى الحب؟ كانشوف بلي... آه.');
    expect(s).toContain('واش غادي نلقى الحب؟');
    expect(s).toContain('آه.');
  });

  it('retire les marques markdown/techniques', () => {
    expect(cleanForSpeech('*مهم* _جدا_ #hash')).toBe('مهم جدا hash');
  });
});
