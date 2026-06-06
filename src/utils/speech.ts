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
 * Sélectionne (sur le web) la meilleure voix arabe disponible — idéalement
 * marocaine (ar-MA), sinon n'importe quelle voix « ar-* ». Renvoie l'identifiant
 * de voix à passer à expo-speech, ou undefined si rien de spécifique.
 */
function pickArabicWebVoice(): string | undefined {
  if (Platform.OS !== 'web') return undefined;
  const synth: any = typeof window !== 'undefined' ? (window as any).speechSynthesis : null;
  if (!synth?.getVoices) return undefined;
  const voices: any[] = synth.getVoices() || [];
  if (!voices.length) return undefined;
  const ar = voices.filter((v) => (v.lang || '').toLowerCase().startsWith('ar'));
  if (!ar.length) return undefined;
  // Priorité : marocain, puis voix féminine, puis première voix arabe.
  const ma = ar.find((v) => (v.lang || '').toLowerCase() === 'ar-ma');
  const female = ar.find((v) => /female|femme|woman|fatima|laila|hala|salma/i.test(v.name || ''));
  return (ma || female || ar[0]).voiceURI;
}

/**
 * Fait parler Moulat Niya, TOUJOURS en darija marocaine (ar-MA).
 * `text` doit être en lettres arabes. `onDone` est appelé à la fin/à l'arrêt.
 */
export function speak(text: string, handlers?: { onStart?: () => void; onDone?: () => void }): void {
  try {
    Speech.stop();
  } catch {
    // ignore
  }
  Speech.speak(text, {
    language: SPEAK_LANG,
    voice: pickArabicWebVoice(),
    pitch: 1.05, // voix légèrement chaleureuse
    rate: Platform.OS === 'web' ? 0.95 : 0.92, // un peu posé, ton de voyante
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
