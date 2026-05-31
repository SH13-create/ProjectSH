/**
 * 💾 Stockage local (AsyncStorage) — aucune donnée ne quitte l'appareil.
 * On garde ici les préférences (écriture de la darija, thème) et l'historique
 * des derniers résultats, pour les retrouver au prochain lancement.
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Result } from './compatibility';

const KEYS = {
  script: '@twafo9/script',
  theme: '@twafo9/theme',
} as const;

const HISTORY_KEY = '@twafo9/history';
const HISTORY_MAX = 20; // on ne garde que les 20 derniers résultats

export async function loadPref(key: keyof typeof KEYS): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(KEYS[key]);
  } catch {
    return null;
  }
}

export async function savePref(key: keyof typeof KEYS, value: string): Promise<void> {
  try {
    await AsyncStorage.setItem(KEYS[key], value);
  } catch {
    // En mode prototype, on ignore silencieusement les erreurs de stockage.
  }
}

// --- Historique des résultats ---------------------------------------------

// Un résultat enregistré = le résultat calculé + un identifiant et une date.
export type HistoryEntry = Result & { id: string; at: string };

export async function loadHistory(): Promise<HistoryEntry[]> {
  try {
    const raw = await AsyncStorage.getItem(HISTORY_KEY);
    return raw ? (JSON.parse(raw) as HistoryEntry[]) : [];
  } catch {
    return [];
  }
}

export async function addHistory(result: Result): Promise<void> {
  try {
    const prev = await loadHistory();
    const entry: HistoryEntry = { ...result, id: String(Date.now()), at: new Date().toISOString() };
    const next = [entry, ...prev].slice(0, HISTORY_MAX);
    await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(next));
  } catch {
    // ignoré en mode prototype
  }
}

export async function clearHistory(): Promise<void> {
  try {
    await AsyncStorage.removeItem(HISTORY_KEY);
  } catch {
    // ignoré
  }
}
