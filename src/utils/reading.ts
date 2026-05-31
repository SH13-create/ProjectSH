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
  aspects: Aspect[];
};

/** Récupère dict[value] si présent, sinon chaîne vide. */
function pick(dict: Record<string, string>, value?: string): string {
  return (value && dict[value]) || '';
}

/** Joint des fragments non vides avec un espace. */
function join(...parts: string[]): string {
  return parts.filter(Boolean).join(' ');
}

// ----------------------------------------------------------------- Mode SOLO
export function buildSoloReading(result: SoloResult, answers: Answers, t: Strings): Reading {
  const r = t.readings;
  const sign = result.sign;
  const solo = t.solo[sign];

  const aspects: Aspect[] = [
    {
      icon: '🌟',
      label: r.personalityLabel,
      text: join(r.elementPersona[result.element], t.signs[sign].trait + '.'),
    },
    {
      icon: '❤️',
      label: t.result.loveLabel,
      text: join(
        pick(r.loveStyleRead, answers.loveStyle),
        pick(r.lovePastRead, answers.lovePast),
        pick(r.wantPartnerRead, answers.wantPartner),
      ),
    },
    {
      icon: '💼',
      label: t.result.workLabel,
      text: solo.work,
    },
    {
      icon: '🔮',
      label: r.yearLabel,
      text: join(pick(r.yearWishRead, answers.yearWish), solo.future),
    },
    {
      icon: '⚠️',
      label: r.watchLabel,
      text: pick(r.fearRead, answers.fear),
    },
  ].filter((a) => a.text.trim().length > 0);

  return {
    intro: format(r.soloIntro, { name: result.name }),
    aspects,
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
