/**
 * 🎙️ Utilitaires voix de Moulat Niya.
 *
 *  - speak()  : synthèse vocale (TTS) via expo-speech — fonctionne web + mobile.
 *               On vise une voix arabe (ar) pour coller au personnage.
 *  - listen() : reconnaissance vocale. Disponible sur le WEB (Web Speech API,
 *               Chrome/Edge) sans backend ; renvoie le texte dicté.
 *               Sur mobile natif (non supporté nativement par Expo), on renvoie
 *               { supported:false } pour que l'UI bascule sur la saisie écrite.
 *
 * Tout reste LOCAL au device/navigateur — aucune donnée envoyée à un serveur.
 */
import { Platform } from 'react-native';
import * as Speech from 'expo-speech';
import type { Script } from '@/locales';

const langFor = (script: Script) => (script === 'ar' ? 'ar' : 'ar'); // voix arabe dans les 2 cas

/** Fait parler Moulat Niya. `onDone` est appelé à la fin (ou en cas d'arrêt). */
export function speak(
  text: string,
  script: Script,
  handlers?: { onStart?: () => void; onDone?: () => void },
): void {
  try {
    Speech.stop();
  } catch {
    // ignore
  }
  Speech.speak(text, {
    language: langFor(script),
    pitch: 1.05, // voix légèrement chaleureuse
    rate: Platform.OS === 'web' ? 1.0 : 0.96,
    onStart: handlers?.onStart,
    onDone: handlers?.onDone,
    onStopped: handlers?.onDone,
    onError: handlers?.onDone,
  });
}

/** Arrête toute synthèse en cours. */
export function stopSpeaking(): void {
  try {
    Speech.stop();
  } catch {
    // ignore
  }
}

// --- Reconnaissance vocale (web) -------------------------------------------

type ListenHandle = { stop: () => void };

export function isListeningSupported(): boolean {
  if (Platform.OS !== 'web') return false;
  const w: any = typeof window !== 'undefined' ? window : null;
  return !!(w && (w.SpeechRecognition || w.webkitSpeechRecognition));
}

/**
 * Démarre l'écoute du micro (web). Renvoie un handle pour stopper, ou null si
 * non supporté. Les callbacks remontent le texte partiel/final et les erreurs.
 */
export function listen(
  onResult: (text: string, isFinal: boolean) => void,
  opts?: { onEnd?: () => void; onError?: (e: string) => void },
): ListenHandle | null {
  if (!isListeningSupported()) return null;
  const w: any = window;
  const Rec = w.SpeechRecognition || w.webkitSpeechRecognition;
  const rec = new Rec();
  rec.lang = 'ar-MA'; // darija marocaine (repli ar si indispo côté navigateur)
  rec.interimResults = true;
  rec.continuous = false;
  rec.maxAlternatives = 1;

  rec.onresult = (e: any) => {
    let txt = '';
    let isFinal = false;
    for (let i = e.resultIndex; i < e.results.length; i++) {
      txt += e.results[i][0].transcript;
      if (e.results[i].isFinal) isFinal = true;
    }
    onResult(txt, isFinal);
  };
  rec.onerror = (e: any) => opts?.onError?.(e?.error ?? 'error');
  rec.onend = () => opts?.onEnd?.();

  try {
    rec.start();
  } catch {
    return null;
  }
  return { stop: () => { try { rec.stop(); } catch { /* ignore */ } } };
}
