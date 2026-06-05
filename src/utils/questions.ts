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

// ===== Questions SPÉCIFIQUES au mode INDIVIDUEL (sur toi & ton avenir) =====

// Ton passé amoureux (nourrit la lecture du futur).
const qLovePast: Question = {
  key: 'lovePast',
  type: 'single',
  title: (s) => s.quiz.lovePast,
  options: [
    { value: 'never', label: (s) => s.quiz.lpNever, emoji: '🌱' },
    { value: 'onebig', label: (s) => s.quiz.lpOneBig, emoji: '💔' },
    { value: 'few', label: (s) => s.quiz.lpFew, emoji: '🎭' },
    { value: 'healing', label: (s) => s.quiz.lpHealing, emoji: '🩹' },
  ],
};

// Ta plus grande peur en amour.
const qFear: Question = {
  key: 'fear',
  type: 'cards',
  title: (s) => s.quiz.fear,
  options: [
    { value: 'betrayal', label: (s) => s.quiz.fearBetrayal, emoji: '🗡️' },
    { value: 'boredom', label: (s) => s.quiz.fearBoredom, emoji: '🥱' },
    { value: 'distance', label: (s) => s.quiz.fearDistance, emoji: '🌫️' },
    { value: 'control', label: (s) => s.quiz.fearControl, emoji: '⛓️' },
  ],
};

// Ce que tu veux cette année (l'angle « futur »).
const qYearWish: Question = {
  key: 'yearWish',
  type: 'cards',
  title: (s) => s.quiz.yearWish,
  options: [
    { value: 'theone', label: (s) => s.quiz.ywTheOne, emoji: '💘' },
    { value: 'marriage', label: (s) => s.quiz.ywMarriage, emoji: '💍' },
    { value: 'fun', label: (s) => s.quiz.ywFun, emoji: '🎉' },
    { value: 'heal', label: (s) => s.quiz.ywHeal, emoji: '🌷' },
    { value: 'reconnect', label: (s) => s.quiz.ywReconnect, emoji: '🔗' },
  ],
};

// ===== Questions « psychologue virtuel » (SOLO) — analyse approfondie =======

// 🧠 Personnalité : énergie sociale (introverti / extraverti / entre les deux).
const qSocialEnergy: Question = {
  key: 'socialEnergy',
  type: 'single',
  title: (s) => s.quiz.socialEnergy,
  options: [
    { value: 'introvert', label: (s) => s.quiz.seIntro, emoji: '🌙' },
    { value: 'extrovert', label: (s) => s.quiz.seExtro, emoji: '☀️' },
    { value: 'ambivert', label: (s) => s.quiz.seAmbi, emoji: '🌗' },
  ],
};

// 🧠 Personnalité : tu décides avec le cœur ou la tête ?
const qDecision: Question = {
  key: 'decision',
  type: 'single',
  title: (s) => s.quiz.decision,
  options: [
    { value: 'heart', label: (s) => s.quiz.decHeart, emoji: '❤️' },
    { value: 'head', label: (s) => s.quiz.decHead, emoji: '🧠' },
    { value: 'both', label: (s) => s.quiz.decBoth, emoji: '⚖️' },
  ],
};

// ⏰ Habitudes quotidiennes : rythme.
const qRhythm: Question = {
  key: 'rhythm',
  type: 'single',
  title: (s) => s.quiz.rhythm,
  options: [
    { value: 'morning', label: (s) => s.quiz.rhMorning, emoji: '🌅' },
    { value: 'night', label: (s) => s.quiz.rhNight, emoji: '🌃' },
    { value: 'flex', label: (s) => s.quiz.rhFlex, emoji: '🔄' },
  ],
};

// 💎 Valeurs : ce qui compte le plus.
const qCoreValue: Question = {
  key: 'coreValue',
  type: 'cards',
  title: (s) => s.quiz.coreValue,
  options: [
    { value: 'family', label: (s) => s.quiz.cvFamily, emoji: '👪' },
    { value: 'freedom', label: (s) => s.quiz.cvFreedom, emoji: '🕊️' },
    { value: 'success', label: (s) => s.quiz.cvSuccess, emoji: '🏆' },
    { value: 'faith', label: (s) => s.quiz.cvFaith, emoji: '🕌' },
    { value: 'honesty', label: (s) => s.quiz.cvHonesty, emoji: '🤝' },
  ],
};

// 🎯 Objectifs de vie.
const qLifeGoal: Question = {
  key: 'lifeGoal',
  type: 'cards',
  title: (s) => s.quiz.lifeGoal,
  options: [
    { value: 'stability', label: (s) => s.quiz.lgStability, emoji: '🏡' },
    { value: 'impact', label: (s) => s.quiz.lgImpact, emoji: '🌍' },
    { value: 'wealth', label: (s) => s.quiz.lgWealth, emoji: '💰' },
    { value: 'knowledge', label: (s) => s.quiz.lgKnowledge, emoji: '📚' },
    { value: 'peace', label: (s) => s.quiz.lgPeace, emoji: '☮️' },
  ],
};

// 👶 Famille : envie d'enfants.
const qWantKids: Question = {
  key: 'wantKids',
  type: 'single',
  title: (s) => s.quiz.wantKids,
  options: [
    { value: 'yes', label: (s) => s.quiz.wkYes, emoji: '👶' },
    { value: 'someday', label: (s) => s.quiz.wkSomeday, emoji: '🕰️' },
    { value: 'maybe', label: (s) => s.quiz.wkMaybe, emoji: '🤔' },
    { value: 'no', label: (s) => s.quiz.wkNo, emoji: '🚫' },
  ],
};

// 🎨 Loisirs.
const qHobby: Question = {
  key: 'hobby',
  type: 'cards',
  title: (s) => s.quiz.hobby,
  options: [
    { value: 'sport', label: (s) => s.quiz.hbSport, emoji: '⚽' },
    { value: 'art', label: (s) => s.quiz.hbArt, emoji: '🎨' },
    { value: 'travel', label: (s) => s.quiz.hbTravel, emoji: '✈️' },
    { value: 'gaming', label: (s) => s.quiz.hbGaming, emoji: '🎮' },
    { value: 'cooking', label: (s) => s.quiz.hbCooking, emoji: '🍳' },
    { value: 'reading', label: (s) => s.quiz.hbReading, emoji: '📖' },
  ],
};

// 🎭 Préférences sociales.
const qSocialPref: Question = {
  key: 'socialPref',
  type: 'single',
  title: (s) => s.quiz.socialPref,
  options: [
    { value: 'circle', label: (s) => s.quiz.spCircle, emoji: '👯' },
    { value: 'crowd', label: (s) => s.quiz.spCrowd, emoji: '🎉' },
    { value: 'solo', label: (s) => s.quiz.spSolo, emoji: '🧘' },
  ],
};

// 🌊 Gestion des émotions (stress).
const qStress: Question = {
  key: 'stress',
  type: 'cards',
  title: (s) => s.quiz.stress,
  options: [
    { value: 'talk', label: (s) => s.quiz.stTalk, emoji: '🗣️' },
    { value: 'alone', label: (s) => s.quiz.stAlone, emoji: '🚪' },
    { value: 'move', label: (s) => s.quiz.stMove, emoji: '🏃' },
    { value: 'faith', label: (s) => s.quiz.stFaith, emoji: '🤲' },
  ],
};

// ✨ Rêves & ambitions.
const qDream: Question = {
  key: 'dream',
  type: 'cards',
  title: (s) => s.quiz.dream,
  options: [
    { value: 'travel', label: (s) => s.quiz.drTravel, emoji: '🌍' },
    { value: 'business', label: (s) => s.quiz.drBusiness, emoji: '🚀' },
    { value: 'fame', label: (s) => s.quiz.drFame, emoji: '🌟' },
    { value: 'family', label: (s) => s.quiz.drFamily, emoji: '🏡' },
  ],
};

// 💪 Ta plus grande qualité.
const qStrength: Question = {
  key: 'strength',
  type: 'cards',
  title: (s) => s.quiz.strength,
  options: [
    { value: 'kind', label: (s) => s.quiz.strKind, emoji: '🤍' },
    { value: 'loyal', label: (s) => s.quiz.strLoyal, emoji: '🔒' },
    { value: 'funny', label: (s) => s.quiz.strFunny, emoji: '😂' },
    { value: 'strong', label: (s) => s.quiz.strStrong, emoji: '💪' },
    { value: 'smart', label: (s) => s.quiz.strSmart, emoji: '🧠' },
  ],
};

// 🌱 Le défaut sur lequel tu travailles.
const qFlaw: Question = {
  key: 'flaw',
  type: 'cards',
  title: (s) => s.quiz.flaw,
  options: [
    { value: 'stubborn', label: (s) => s.quiz.flStubborn, emoji: '🐂' },
    { value: 'impatient', label: (s) => s.quiz.flImpatient, emoji: '⏳' },
    { value: 'shy', label: (s) => s.quiz.flShy, emoji: '🙈' },
    { value: 'overthink', label: (s) => s.quiz.flOverthink, emoji: '🌀' },
  ],
};

// 🔭 Vision du futur.
const qFutureVision: Question = {
  key: 'futureVision',
  type: 'single',
  title: (s) => s.quiz.futureVision,
  options: [
    { value: 'optimist', label: (s) => s.quiz.fvOptimist, emoji: '🌈' },
    { value: 'planner', label: (s) => s.quiz.fvPlanner, emoji: '🗺️' },
    { value: 'dreamer', label: (s) => s.quiz.fvDreamer, emoji: '☁️' },
    { value: 'realist', label: (s) => s.quiz.fvRealist, emoji: '🎯' },
  ],
};

// ===== Questions SPÉCIFIQUES au mode COUPLE (sur la relation) =====

// Depuis combien de temps ensemble.
const qHowLong: Question = {
  key: 'howLong',
  type: 'single',
  title: (s) => s.quiz.howLong,
  options: [
    { value: 'new', label: (s) => s.quiz.hlNew, emoji: '🌱' },
    { value: 'months', label: (s) => s.quiz.hlMonths, emoji: '🌿' },
    { value: 'years', label: (s) => s.quiz.hlYears, emoji: '🌳' },
    { value: 'long', label: (s) => s.quiz.hlLong, emoji: '🏛️' },
  ],
};

// Ce que tu admires le plus chez ton/ta partenaire.
const qAdmire: Question = {
  key: 'admire',
  type: 'cards',
  title: (s) => s.quiz.admire,
  options: [
    { value: 'heart', label: (s) => s.quiz.adHeart, emoji: '🤍' },
    { value: 'mind', label: (s) => s.quiz.adMind, emoji: '🧠' },
    { value: 'humor', label: (s) => s.quiz.adHumor, emoji: '😂' },
    { value: 'looks', label: (s) => s.quiz.adLooks, emoji: '✨' },
    { value: 'ambition', label: (s) => s.quiz.adAmbition, emoji: '🚀' },
  ],
};

// Le plus grand défi du couple.
const qChallenge: Question = {
  key: 'challenge',
  type: 'cards',
  title: (s) => s.quiz.challenge,
  options: [
    { value: 'distance', label: (s) => s.quiz.chDistance, emoji: '📍' },
    { value: 'jealousy', label: (s) => s.quiz.chJealousy, emoji: '👀' },
    { value: 'routine', label: (s) => s.quiz.chRoutine, emoji: '🔁' },
    { value: 'family', label: (s) => s.quiz.chFamily, emoji: '👪' },
    { value: 'money', label: (s) => s.quiz.chMoney, emoji: '💰' },
  ],
};

// --- Flux par mode ---------------------------------------------------------
// Les deux parcours sont VOLONTAIREMENT DIFFÉRENTS :
//  - SOLO   = centré sur TOI et ton avenir (passé amoureux, peurs, souhait…)
//  - COUPLE = centré sur la RELATION (durée, défis, admiration, projet commun)
// Quelques questions « fun » restent communes (élément, lieu de rêve…).

const SOLO_QUESTIONS: Question[] = [
  // Identité
  qName,
  qBirth,
  qBirthTime,
  qGender,
  qStatus,
  // 🧠 Personnalité
  qSocialEnergy,
  qDecision,
  qStrength,
  qFlaw,
  // ⏰ Habitudes + 🎭 social
  qRhythm,
  qSocialPref,
  qHobby,
  // 💎 Valeurs + 🎯 objectifs
  qCoreValue,
  qLifeGoal,
  // 🌊 Émotions
  qStress,
  // ❤️ Amour
  qLoveStyle,
  qLovePast,
  qWantPartner,
  qFear,
  // 👪 Famille
  qWantKids,
  // ✨ Rêves + 🔭 futur
  qDream,
  qFutureVision,
  qYearWish,
  // Touche « fun » finale
  qElement,
  qAnimal,
  qColor,
  qDreamPlace,
];

const COUPLE_QUESTIONS: Question[] = [
  qName,
  qPartnerName,
  qBirth,
  qPartnerBirth,
  qBirthTime,
  qHowLong,
  qLoveLang,
  qConflict,
  qAdmire,
  qChallenge,
  qElement,
  qSeason,
  qDreamPlace,
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
