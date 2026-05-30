/**
 * Construit le texte à partager (bouton « Partager ») à partir d'un résultat.
 * Tout est tiré des traductions pour rester dans l'écriture choisie.
 */
import type { Strings } from '@/locales';
import type { CoupleResult, Result, SoloResult } from './compatibility';
import { getZodiacInfo } from './zodiac';

export function buildShareText(result: Result, t: Strings): string {
  if (result.mode === 'couple') {
    const r = result as CoupleResult;
    const band = t.bands[r.bandIndex];
    const s1 = `${getZodiacInfo(r.sign1).emoji} ${t.signs[r.sign1].name}`;
    const s2 = `${getZodiacInfo(r.sign2).emoji} ${t.signs[r.sign2].name}`;
    return `${t.result.shareIntroCouple}\n${r.name1} (${s1}) ❤️ ${r.name2} (${s2})\n${t.result.scoreLabel}: ${r.score}%\n${band.title}\n\n— ${t.common.appName}`;
  }

  const r = result as SoloResult;
  const sign = `${getZodiacInfo(r.sign).emoji} ${t.signs[r.sign].name}`;
  const solo = t.solo[r.sign];
  return `${t.result.shareIntroSolo}\n${r.name} — ${sign}\n${t.result.loveLabel}: ${solo.love}\n\n— ${t.common.appName}`;
}
