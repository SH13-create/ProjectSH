/**
 * Point d'entrée des traductions.
 * On expose les deux écritures de la darija et un helper de formatage.
 */
import ar from './ar';
import arabizi from './arabizi';
import type { Script, Strings } from './types';

export type { Script, Strings, SoloReading, Band } from './types';

export const LOCALES: Record<Script, Strings> = {
  ar,
  arabizi,
};

/** Remplace les variables {key} dans un template (ex. "{current} / {total}"). */
export function format(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ''));
}
