/**
 * Définition des questions du quiz (mode individuel & couple).
 * Chaque question sait comment afficher son titre et ses options à partir
 * des traductions, ce qui garde toute la logique du flux à un seul endroit.
 *
 * 👉 Pour ajouter/retirer une question, modifie les tableaux en bas du fichier.
 */
import type { Strings } from '@/locales';
import type { Element } from './zodiac';

export type Mode = 'solo' | 'couple';

export type QuestionType = 'text' | 'date' | 'single' | 'cards';

export type Option = {
  value: string;
  label: (s: Strings) => string;
  emoji?: string;
};

export type Question = {
  key: string; // clé de la réponse
  type: QuestionType;
  title: (s: Strings) => string;
  placeholder?: (s: Strings) => string;
  options?: Option[];
};

// Les réponses stockées : tout est en string (les dates en ISO).
export type Answers = Record<string, string>;

// --- Briques de questions réutilisables -----------------------------------

const qName: Question = {
  key: 'name',
  type: 'text',
  title: (s) => s.quiz.yourName,
  placeholder: (s) => s.quiz.yourNamePh,
};

const qPartnerName: Question = {
  key: 'partnerName',
  type: 'text',
  title: (s) => s.quiz.partnerName,
  placeholder: (s) => s.quiz.partnerNamePh,
};

const qBirth: Question = {
  key: 'birth',
  type: 'date',
  title: (s) => s.quiz.yourBirth,
};

const qPartnerBirth: Question = {
  key: 'partnerBirth',
  type: 'date',
  title: (s) => s.quiz.partnerBirth,
};

const qGender: Question = {
  key: 'gender',
  type: 'single',
  title: (s) => s.quiz.gender,
  options: [
    { value: 'male', label: (s) => s.quiz.genderMale, emoji: '👨' },
    { value: 'female', label: (s) => s.quiz.genderFemale, emoji: '👩' },
    { value: 'other', label: (s) => s.quiz.genderOther, emoji: '🙂' },
  ],
};

const qStatus: Question = {
  key: 'status',
  type: 'single',
  title: (s) => s.quiz.status,
  options: [
    { value: 'single', label: (s) => s.quiz.statusSingle, emoji: '🦋' },
    { value: 'relationship', label: (s) => s.quiz.statusRelationship, emoji: '💑' },
    { value: 'married', label: (s) => s.quiz.statusMarried, emoji: '💍' },
    { value: 'complicated', label: (s) => s.quiz.statusComplicated, emoji: '🌀' },
  ],
};

const qColor: Question = {
  key: 'color',
  type: 'cards',
  title: (s) => s.quiz.color,
  options: [
    { value: 'red', label: (s) => s.quiz.colorRed, emoji: '❤️' },
    { value: 'blue', label: (s) => s.quiz.colorBlue, emoji: '💙' },
    { value: 'green', label: (s) => s.quiz.colorGreen, emoji: '💚' },
    { value: 'gold', label: (s) => s.quiz.colorGold, emoji: '💛' },
  ],
};

const qElement: Question = {
  key: 'element',
  type: 'cards',
  title: (s) => s.quiz.element,
  options: [
    { value: 'fire', label: (s) => s.quiz.elementFire, emoji: '🔥' },
    { value: 'water', label: (s) => s.quiz.elementWater, emoji: '💧' },
    { value: 'earth', label: (s) => s.quiz.elementEarth, emoji: '🌱' },
    { value: 'air', label: (s) => s.quiz.elementAir, emoji: '🌬️' },
  ],
};

const qAnimal: Question = {
  key: 'animal',
  type: 'cards',
  title: (s) => s.quiz.animal,
  options: [
    { value: 'lion', label: (s) => s.quiz.animalLion, emoji: '🦁' },
    { value: 'cat', label: (s) => s.quiz.animalCat, emoji: '🐱' },
    { value: 'eagle', label: (s) => s.quiz.animalEagle, emoji: '🦅' },
    { value: 'dolphin', label: (s) => s.quiz.animalDolphin, emoji: '🐬' },
  ],
};

const qProject: Question = {
  key: 'project',
  type: 'cards',
  title: (s) => s.quiz.project,
  options: [
    { value: 'marriage', label: (s) => s.quiz.projectMarriage, emoji: '💍' },
    { value: 'travel', label: (s) => s.quiz.projectTravel, emoji: '✈️' },
    { value: 'career', label: (s) => s.quiz.projectCareer, emoji: '💼' },
    { value: 'study', label: (s) => s.quiz.projectStudy, emoji: '📚' },
  ],
};

const qSeason: Question = {
  key: 'season',
  type: 'cards',
  title: (s) => s.quiz.season,
  options: [
    { value: 'spring', label: (s) => s.quiz.seasonSpring, emoji: '🌸' },
    { value: 'summer', label: (s) => s.quiz.seasonSummer, emoji: '☀️' },
    { value: 'autumn', label: (s) => s.quiz.seasonAutumn, emoji: '🍂' },
    { value: 'winter', label: (s) => s.quiz.seasonWinter, emoji: '❄️' },
  ],
};

const qDate: Question = {
  key: 'dateIdea',
  type: 'cards',
  title: (s) => s.quiz.date,
  options: [
    { value: 'cafe', label: (s) => s.quiz.dateCafe, emoji: '☕' },
    { value: 'walk', label: (s) => s.quiz.dateWalk, emoji: '🚶' },
    { value: 'cinema', label: (s) => s.quiz.dateCinema, emoji: '🎬' },
    { value: 'food', label: (s) => s.quiz.dateFood, emoji: '🍽️' },
  ],
};

// --- Questions inspirées du benchmark (apps de compatibilité/astro) ---------

// Heure de naissance approximative : forte personnalisation, avec une porte de
// sortie « je sais pas » pour ne pas bloquer l'utilisateur.
const qBirthTime: Question = {
  key: 'birthTime',
  type: 'single',
  title: (s) => s.quiz.birthTime,
  options: [
    { value: 'morning', label: (s) => s.quiz.btMorning, emoji: '🌅' },
    { value: 'afternoon', label: (s) => s.quiz.btAfternoon, emoji: '🌞' },
    { value: 'evening', label: (s) => s.quiz.btEvening, emoji: '🌆' },
    { value: 'night', label: (s) => s.quiz.btNight, emoji: '🌙' },
    { value: 'unknown', label: (s) => s.quiz.btUnknown, emoji: '🤷' },
  ],
};

// Style d'attachement amoureux (le prédicteur le plus fort selon le benchmark).
const qLoveStyle: Question = {
  key: 'loveStyle',
  type: 'single',
  title: (s) => s.quiz.loveStyle,
  options: [
    { value: 'close', label: (s) => s.quiz.lsClose, emoji: '🤗' },
    { value: 'free', label: (s) => s.quiz.lsFree, emoji: '🕊️' },
    { value: 'calm', label: (s) => s.quiz.lsCalm, emoji: '😌' },
    { value: 'hotcold', label: (s) => s.quiz.lsHotCold, emoji: '🌗' },
  ],
};

// Langage de l'amour.
const qLoveLang: Question = {
  key: 'loveLang',
  type: 'cards',
  title: (s) => s.quiz.loveLang,
  options: [
    { value: 'words', label: (s) => s.quiz.llWords, emoji: '💬' },
    { value: 'time', label: (s) => s.quiz.llTime, emoji: '⏳' },
    { value: 'help', label: (s) => s.quiz.llHelp, emoji: '🤝' },
    { value: 'gifts', label: (s) => s.quiz.llGifts, emoji: '🎁' },
    { value: 'touch', label: (s) => s.quiz.llTouch, emoji: '🫂' },
  ],
};

// Ce que tu cherches chez un partenaire.
const qWantPartner: Question = {
  key: 'wantPartner',
  type: 'cards',
  title: (s) => s.quiz.wantPartner,
  options: [
    { value: 'loyal', label: (s) => s.quiz.wpLoyal, emoji: '🔒' },
    { value: 'ambition', label: (s) => s.quiz.wpAmbition, emoji: '🚀' },
    { value: 'humor', label: (s) => s.quiz.wpHumor, emoji: '😂' },
    { value: 'warm', label: (s) => s.quiz.wpWarm, emoji: '🤍' },
    { value: 'faith', label: (s) => s.quiz.wpFaith, emoji: '🕌' },
  ],
};

// Façon de gérer une dispute.
const qConflict: Question = {
  key: 'conflict',
  type: 'single',
  title: (s) => s.quiz.conflict,
  options: [
    { value: 'talk', label: (s) => s.quiz.cfTalk, emoji: '🗣️' },
    { value: 'space', label: (s) => s.quiz.cfSpace, emoji: '🚪' },
    { value: 'quiet', label: (s) => s.quiz.cfQuiet, emoji: '🤐' },
    { value: 'fire', label: (s) => s.quiz.cfFire, emoji: '🔥' },
  ],
};

// Lieu de rêve (question projective, très fun et partageable).
const qDreamPlace: Question = {
  key: 'dreamPlace',
  type: 'cards',
  title: (s) => s.quiz.dreamPlace,
  options: [
    { value: 'beach', label: (s) => s.quiz.dpBeach, emoji: '🏖️' },
    { value: 'mountain', label: (s) => s.quiz.dpMountain, emoji: '⛰️' },
    { value: 'city', label: (s) => s.quiz.dpCity, emoji: '🌃' },
    { value: 'desert', label: (s) => s.quiz.dpDesert, emoji: '🏜️' },
  ],
};

// --- Flux par mode ---------------------------------------------------------
// Ordre pensé pour l'engagement : on commence léger (identité), puis on creuse
// la personnalité amoureuse, et on garde les questions « fun » pour rythmer.

const SOLO_QUESTIONS: Question[] = [
  qName,
  qBirth,
  qBirthTime,
  qGender,
  qStatus,
  qLoveStyle,
  qLoveLang,
  qWantPartner,
  qConflict,
  qElement,
  qAnimal,
  qColor,
  qSeason,
  qDreamPlace,
  qDate,
  qProject,
];

const COUPLE_QUESTIONS: Question[] = [
  qName,
  qPartnerName,
  qBirth,
  qPartnerBirth,
  qBirthTime,
  qGender,
  qStatus,
  qLoveStyle,
  qLoveLang,
  qWantPartner,
  qConflict,
  qElement,
  qAnimal,
  qColor,
  qSeason,
  qDreamPlace,
  qDate,
  qProject,
];

export function getQuestions(mode: Mode): Question[] {
  return mode === 'couple' ? COUPLE_QUESTIONS : SOLO_QUESTIONS;
}

// Map valeur d'élément -> type Element (pour la logique de compatibilité).
export const ELEMENT_VALUES: Record<string, Element> = {
  fire: 'fire',
  water: 'water',
  earth: 'earth',
  air: 'air',
};
