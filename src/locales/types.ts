/**
 * Définition de TOUS les textes de l'app (typé).
 * Deux "écritures" de la darija implémentent cette interface :
 *   - ar.ts      → darija en lettres arabes (RTL)
 *   - arabizi.ts → darija en lettres latines / chiffres (LTR)
 *
 * 👉 Pour modifier un texte, va dans le fichier d'écriture correspondant.
 */
import type { Element, ZodiacSign } from '@/utils/zodiac';

export type Script = 'ar' | 'arabizi';

export type SoloReading = {
  love: string;
  work: string;
  future: string;
};

export type Band = {
  title: string;
  paragraph: string;
  advice: string;
};

export interface Strings {
  dir: 'rtl' | 'ltr';
  scriptLabel: string; // nom de l'écriture dans sa propre écriture

  common: {
    next: string;
    back: string;
    start: string;
    appName: string;
    tagline: string;
  };

  onboarding: {
    welcome: string;
    chooseMode: string;
    soloTitle: string;
    soloDesc: string;
    coupleTitle: string;
    coupleDesc: string;
    scriptSwitch: string;
  };

  quiz: {
    progress: string; // "{current} / {total}"
    yourName: string;
    yourNamePh: string;
    partnerName: string;
    partnerNamePh: string;
    yourBirth: string;
    partnerBirth: string;
    pickDate: string;
    gender: string;
    genderMale: string;
    genderFemale: string;
    genderOther: string;
    status: string;
    statusSingle: string;
    statusRelationship: string;
    statusMarried: string;
    statusComplicated: string;
    color: string;
    colorRed: string;
    colorBlue: string;
    colorGreen: string;
    colorGold: string;
    element: string;
    elementFire: string;
    elementWater: string;
    elementEarth: string;
    elementAir: string;
    animal: string;
    animalLion: string;
    animalCat: string;
    animalEagle: string;
    animalDolphin: string;
    project: string;
    projectMarriage: string;
    projectTravel: string;
    projectCareer: string;
    projectStudy: string;
    season: string;
    seasonSpring: string;
    seasonSummer: string;
    seasonAutumn: string;
    seasonWinter: string;
    date: string;
    dateCafe: string;
    dateWalk: string;
    dateCinema: string;
    dateFood: string;
  };

  loading: {
    title: string;
    sub: string;
  };

  result: {
    scoreLabel: string;
    soloTitle: string; // "القراءة ديالك"
    loveLabel: string;
    workLabel: string;
    futureLabel: string;
    adviceLabel: string;
    share: string;
    restart: string;
    disclaimer: string;
    shareIntroCouple: string; // préfixe du texte partagé
    shareIntroSolo: string;
    yourSign: string;
    partnerSign: string;
    age: string;
  };

  history: {
    open: string; // bouton sur l'accueil
    title: string;
    empty: string;
    clear: string;
    scoreShort: string; // ex. "توافق"
  };

  // Noms + petits traits par signe
  signs: Record<ZodiacSign, { name: string; trait: string }>;
  elements: Record<Element, string>;

  // Lecture individuelle par signe
  solo: Record<ZodiacSign, SoloReading>;

  // Façon d'aimer de chaque signe (utilisée pour composer une interprétation
  // de couple propre à la PAIRE de signes, pas juste au palier de score).
  coupleStyle: Record<ZodiacSign, string>;
  // Gabarit composant les deux styles : {a} et {b} = phrases coupleStyle.
  coupleNarrative: string;

  // 5 paliers de score de compatibilité (du plus faible au plus fort)
  bands: [Band, Band, Band, Band, Band];

  // Phrase courte sur la relation entre les deux éléments
  elementChemistry: {
    same: string;
    friendly: string;
    neutral: string;
    tense: string;
  };
}
