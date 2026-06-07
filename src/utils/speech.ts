/**
 * 🎙️ Utilitaires voix de Moulat Niya.
 *
 *  - speak()  : synthèse vocale (TTS) via expo-speech — fonctionne web + mobile.
 *               ⚠️ La voix lit TOUJOURS en arabe (darija marocaine, ar-MA),
 *               quel que soit l'affichage. On lui passe donc le texte en LETTRES
 *               ARABES (jamais l'arabizi latin, qui sonnerait faux).
 *  - listen() : reconnaissance vocale. Disponible sur le WEB (Web Speech API,
 *               Chrome/Edge) sans backend ; renvoie le texte dicté.
 *               Sur mobile natif (non supporté nativement par Expo), on renvoie
 *               { supported:false } pour que l'UI bascule sur la saisie écrite.
 *
 * Tout reste LOCAL au device/navigateur — aucune donnée envoyée à un serveur.
 */
import { Platform } from 'react-native';
import * as Speech from 'expo-speech';

// On vise la darija marocaine ; si la voix MA n'existe pas, le moteur retombe
// automatiquement sur une voix arabe standard.
const SPEAK_LANG = 'ar-MA';

/**
 * Précharge la liste des voix du navigateur (web). Elle est parfois remplie de
 * façon asynchrone : on l'amorce au démarrage pour que la voix arabe soit prête.
 */
export function warmUpVoices(): void {
  if (Platform.OS !== 'web') return;
  const synth: any = typeof window !== 'undefined' ? (window as any).speechSynthesis : null;
  if (!synth?.getVoices) return;
  try {
    synth.getVoices();
    synth.onvoiceschanged = () => synth.getVoices();
  } catch {
    // ignore
  }
}

/** Renvoie la liste des voix arabes disponibles (web), triées par préférence. */
function arabicWebVoices(): any[] {
  if (Platform.OS !== 'web') return [];
  const synth: any = typeof window !== 'undefined' ? (window as any).speechSynthesis : null;
  if (!synth?.getVoices) return [];
  const voices: any[] = synth.getVoices() || [];
  const ar = voices.filter((v) => (v.lang || '').toLowerCase().startsWith('ar'));
  // Priorité : marocain, puis voix féminine, puis le reste.
  ar.sort((a, b) => score(b) - score(a));
  return ar;
}
function score(v: any): number {
  const lang = (v.lang || '').toLowerCase();
  const name = v.name || '';
  let s = 0;
  if (lang === 'ar-ma') s += 10;
  if (/female|femme|woman|fatima|laila|layla|hala|salma|maryam/i.test(name)) s += 3;
  return s;
}

/**
 * Indique si une voix arabe est réellement disponible.
 * - mobile (expo-speech natif) : on suppose une voix arabe système → true.
 * - web : true seulement si le navigateur a une voix « ar-* » installée.
 * Permet à l'UI de NE PARLER QU'EN ARABE (jamais une voix latine sur du texte AR).
 */
export function hasArabicVoice(): boolean {
  if (Platform.OS !== 'web') return true;
  return arabicWebVoices().length > 0;
}

/**
 * Fait parler Moulat Niya, TOUJOURS en darija marocaine (ar-MA).
 * `text` doit être en lettres arabes. Sur le web, si AUCUNE voix arabe n'est
 * disponible, on n'émet PAS de voix latine (on déclenche onDone directement) —
 * conformément à l'exigence « voix en arabe uniquement ».
 */
export function speak(text: string, handlers?: { onStart?: () => void; onDone?: () => void }): void {
  try {
    Speech.stop();
  } catch {
    // ignore
  }

  if (Platform.OS === 'web') {
    const voices = arabicWebVoices();
    if (!voices.length) {
      // Pas de voix arabe → on s'abstient (jamais d'anglais/français).
      handlers?.onDone?.();
      return;
    }
    Speech.speak(text, {
      language: SPEAK_LANG,
      voice: voices[0].voiceURI,
      pitch: 1.05,
      rate: 0.95,
      onStart: handlers?.onStart,
      onDone: handlers?.onDone,
      onStopped: handlers?.onDone,
      onError: handlers?.onDone,
    });
    return;
  }

  // Mobile : voix arabe système.
  Speech.speak(text, {
    language: SPEAK_LANG,
    pitch: 1.05,
    rate: 0.92, // posé, ton de voyante
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
