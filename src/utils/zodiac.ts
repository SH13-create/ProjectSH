/**
 * ♈ Logique astrologique : calcul du signe à partir de la date de naissance,
 * élément associé, emoji et noms en darija (arabe + arabizi).
 *
 * 👉 Pour modifier les noms des signes, édite le tableau ZODIAC ci-dessous.
 */

export type Element = 'fire' | 'earth' | 'air' | 'water';

export type ZodiacSign =
  | 'aries'
  | 'taurus'
  | 'gemini'
  | 'cancer'
  | 'leo'
  | 'virgo'
  | 'libra'
  | 'scorpio'
  | 'sagittarius'
  | 'capricorn'
  | 'aquarius'
  | 'pisces';

export type ZodiacInfo = {
  key: ZodiacSign;
  emoji: string;
  element: Element;
  // Bornes de la période (mois 1-12, jour). Le signe va de (startMonth/startDay) à la veille du suivant.
  startMonth: number;
  startDay: number;
  // Noms en darija
  nameAr: string;
  nameArabizi: string;
};

// Ordre = ordre des périodes dans l'année.
export const ZODIAC: ZodiacInfo[] = [
  { key: 'capricorn', emoji: '🐐', element: 'earth', startMonth: 12, startDay: 22, nameAr: 'الجدي', nameArabizi: 'Jady' },
  { key: 'aquarius', emoji: '🏺', element: 'air', startMonth: 1, startDay: 20, nameAr: 'الدلو', nameArabizi: 'Dalw' },
  { key: 'pisces', emoji: '🐟', element: 'water', startMonth: 2, startDay: 19, nameAr: 'الحوت', nameArabizi: 'Hut' },
  { key: 'aries', emoji: '🐏', element: 'fire', startMonth: 3, startDay: 21, nameAr: 'الحمل', nameArabizi: 'Hamal' },
  { key: 'taurus', emoji: '🐂', element: 'earth', startMonth: 4, startDay: 20, nameAr: 'الثور', nameArabizi: 'Thawr' },
  { key: 'gemini', emoji: '👯', element: 'air', startMonth: 5, startDay: 21, nameAr: 'الجوزاء', nameArabizi: 'Jawza' },
  { key: 'cancer', emoji: '🦀', element: 'water', startMonth: 6, startDay: 21, nameAr: 'السرطان', nameArabizi: 'Saratan' },
  { key: 'leo', emoji: '🦁', element: 'fire', startMonth: 7, startDay: 23, nameAr: 'الأسد', nameArabizi: 'Asad' },
  { key: 'virgo', emoji: '🌾', element: 'earth', startMonth: 8, startDay: 23, nameAr: 'العذراء', nameArabizi: 'Adra' },
  { key: 'libra', emoji: '⚖️', element: 'air', startMonth: 9, startDay: 23, nameAr: 'الميزان', nameArabizi: 'Mizan' },
  { key: 'scorpio', emoji: '🦂', element: 'water', startMonth: 10, startDay: 23, nameAr: 'العقرب', nameArabizi: '3aqrab' },
  { key: 'sagittarius', emoji: '🏹', element: 'fire', startMonth: 11, startDay: 22, nameAr: 'القوس', nameArabizi: 'Qaws' },
];

const BY_KEY: Record<ZodiacSign, ZodiacInfo> = ZODIAC.reduce(
  (acc, z) => ({ ...acc, [z.key]: z }),
  {} as Record<ZodiacSign, ZodiacInfo>,
);

export function getZodiacInfo(sign: ZodiacSign): ZodiacInfo {
  return BY_KEY[sign];
}

/**
 * Calcule le signe astrologique à partir d'une date.
 * Déterministe : la même date donne toujours le même signe.
 */
export function getZodiacSign(date: Date): ZodiacSign {
  const month = date.getMonth() + 1; // 1-12
  const day = date.getDate();
  const value = month * 100 + day; // ex. 21 mars => 321

  // Le Capricorne chevauche la fin d'année (22 déc → 19 jan) : on le traite à part.
  if (value >= 1222 || value <= 119) return 'capricorn';

  // Pour les autres : la période va de leur début jusqu'à la veille du signe suivant.
  for (const z of ZODIAC) {
    if (z.key === 'capricorn') continue;
    const next = ZODIAC[(ZODIAC.indexOf(z) + 1) % ZODIAC.length];
    const start = z.startMonth * 100 + z.startDay;
    const end = next.startMonth * 100 + next.startDay - 1;
    if (value >= start && value <= end) return z.key;
  }
  return 'capricorn'; // sécurité
}

/** Calcule l'âge à partir de la date de naissance (déterministe vis-à-vis de `now`). */
export function getAge(birth: Date, now: Date = new Date()): number {
  let age = now.getFullYear() - birth.getFullYear();
  const m = now.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) age--;
  return Math.max(0, age);
}
