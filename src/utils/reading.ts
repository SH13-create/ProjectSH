/**
 * 🔮 Composeur de la lecture détaillée de Moulat Niya.
 *
 * À partir des réponses (answers) + du résultat calculé, on assemble une
 * analyse PERSONNALISÉE en plusieurs « aspects » (cartes). Chaque aspect est
 * composé de fragments de texte choisis selon les réponses réelles de la
 * personne — c'est ce qui donne l'effet « elle me connaît ».
 *
 * Tout reste DÉTERMINISTE et 100% local (aucun appel externe).
 */
import type { Strings } from '@/locales';
import { format } from '@/locales';
import type { CoupleResult, SoloResult } from './compatibility';
import type { Answers } from './questions';

export type Aspect = { icon: string; label: string; text: string };

export type Reading = {
  intro: string;
  archetypeName?: string; // archétype mis en avant (solo)
  aspects: Aspect[];
  outro?: string; // mot de fin de Moulat Niya
};

/** Récupère dict[value] si présent, sinon chaîne vide. */
function pick(dict: Record<string, string>, value?: string): string {
  return (value && dict[value]) || '';
}

/** Joint des fragments non vides avec un séparateur (espace par défaut). */
function join(...parts: string[]): string {
  return parts.filter(Boolean).join(' ');
}
function para(...parts: string[]): string {
  return parts.filter(Boolean).join(' ');
}

// Petit utilitaire : ne garde l'aspect que s'il a du texte.
function aspect(icon: string, label: string, text: string): Aspect | null {
  return text.trim().length > 0 ? { icon, label, text } : null;
}

// ----------------------------------------------------------------- Mode SOLO
export function buildSoloReading(result: SoloResult, answers: Answers, t: Strings): Reading {
  const r = t.readings;
  const sign = result.sign;
  const solo = t.solo[sign];

  // Archétype : combine l'élément du signe + l'énergie sociale choisie.
  const energyKey = answers.socialEnergy === 'extrovert' ? 'extrovert' : 'introvert';
  const arch = r.archetypes[`${result.element}-${energyKey}`];

  const aspects = [
    // 1. Portrait global (archétype + élément + signe + mix)
    aspect(
      '🪞',
      r.portraitLabel,
      para(
        arch ? `${arch.name} — ${arch.text}` : '',
        r.elementPersona[result.element],
        `${t.signs[sign].name}: ${t.signs[sign].trait}.`,
      ),
    ),
    // 2. Personnalité profonde (énergie + décision)
    aspect(
      '🧠',
      r.personalityLabel,
      para(pick(r.socialEnergyRead, answers.socialEnergy), pick(r.decisionRead, answers.decision)),
    ),
    // 3. Rythme & habitudes
    aspect('⏰', r.dailyLabel, para(pick(r.rhythmRead, answers.rhythm), pick(r.hobbyRead, answers.hobby))),
    // 4. Valeurs & objectifs de vie
    aspect(
      '💎',
      r.valuesLabel,
      para(pick(r.coreValueRead, answers.coreValue), pick(r.lifeGoalRead, answers.lifeGoal)),
    ),
    // 5. Gestion des émotions
    aspect('🌊', r.emotionsLabel, pick(r.stressRead, answers.stress)),
    // 6. Vie sociale
    aspect('🎭', r.socialLabel, pick(r.socialPrefRead, answers.socialPref)),
    // 7. Amour (style + passé + ce qu'on cherche)
    aspect(
      '❤️',
      t.result.loveLabel,
      para(
        pick(r.loveStyleRead, answers.loveStyle),
        pick(r.lovePastRead, answers.lovePast),
        pick(r.wantPartnerRead, answers.wantPartner),
      ),
    ),
    // 8. Famille
    aspect('👪', r.familyLabel, pick(r.wantKidsRead, answers.wantKids)),
    // 9. Rêves & ambitions
    aspect('✨', r.dreamsLabel, para(pick(r.dreamRead, answers.dream), pick(r.strengthRead, answers.strength))),
    // 10. Point de croissance (défaut + peur)
    aspect(
      '🌱',
      r.growthLabel,
      para(pick(r.flawRead, answers.flaw), pick(r.fearRead, answers.fear)),
    ),
    // 11. Travail / chemin
    aspect('💼', t.result.workLabel, solo.work),
    // 12. Vision du futur + souhait de l'année
    aspect(
      '🔭',
      r.futureLabel,
      para(pick(r.futureVisionRead, answers.futureVision), pick(r.yearWishRead, answers.yearWish), solo.future),
    ),
  ].filter((a): a is Aspect => a !== null);

  return {
    intro: format(r.soloIntro, { name: result.name }),
    archetypeName: arch?.name,
    aspects,
    outro: format(r.soloOutro, { name: result.name }),
  };
}

// --------------------------------------------------------------- Mode COUPLE
export function buildCoupleReading(result: CoupleResult, answers: Answers, t: Strings): Reading {
  const r = t.readings;

  const aspects: Aspect[] = [
    {
      icon: '💪',
      label: r.strengthsLabel,
      text: join(
        t.elementChemistry[result.chemistry],
        pick(r.howLongRead, answers.howLong),
        pick(r.admireRead, answers.admire),
      ),
    },
    {
      icon: '🗨️',
      label: r.commLabel,
      text: join(pick(r.conflictRead, answers.conflict), pick(r.loveLangRead, answers.loveLang)),
    },
    {
      icon: '⚠️',
      label: r.watchLabel,
      text: pick(r.challengeRead, answers.challenge),
    },
    {
      icon: '🔮',
      label: r.futureTogetherLabel,
      text: pick(r.projectRead, answers.project),
    },
  ].filter((a) => a.text.trim().length > 0);

  return {
    intro: format(r.coupleIntro, { name1: result.name1, name2: result.name2 }),
    aspects,
  };
}
