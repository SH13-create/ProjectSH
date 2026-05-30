/**
 * 💾 Stockage local (AsyncStorage) — aucune donnée ne quitte l'appareil.
 * On garde ici les préférences (écriture de la darija, thème) pour les
 * retrouver au prochain lancement.
 */
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  script: '@twafo9/script',
  theme: '@twafo9/theme',
} as const;

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
