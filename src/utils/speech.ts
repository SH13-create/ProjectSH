/**
 * 🎙️ Utilitaires voix de Moulat Niya — TOUJOURS en darija marocaine (ar-MA).
 *
 *  - speak()  : synthèse vocale.
 *      • Web  : API native du navigateur (window.speechSynthesis +
 *               SpeechSynthesisUtterance) — la plus fiable sur Chrome/Edge/Safari.
 *               On choisit une voix arabe si le navigateur en propose une (Chrome
 *               fournit « Google العربية » en ligne), sinon on force quand même
 *               lang = 'ar-MA' (aucune installation manuelle requise).
 *      • Mobile : expo-speech avec language 'ar-MA'.
 *  - unlockAudio() : à appeler au PREMIER geste utilisateur. Les navigateurs
 *               bloquent l'audio tant que l'utilisateur n'a pas interagi
 *               (politique autoplay) : on « débloque » le moteur ici.
 *  - listen() : reconnaissance vocale (web, Chrome/Edge).
 *
 * Tout reste LOCAL — aucune donnée envoyée à un serveur.
 */
import { Platform } from 'react-native';
import * as Speech from 'expo-speech';

const SPEAK_LANG = 'ar-MA';
const isWeb = Platform.OS === 'web';

function synth(): any {
  return typeof window !== 'undefined' ? (window as any).speechSynthesis : null;
}

/** Précharge la liste des voix (web) — elle se remplit parfois en asynchrone. */
export function warmUpVoices(): void {
  if (!isWeb) return;
  const s = synth();
  if (!s?.getVoices) return;
  try {
    s.getVoices();
    s.onvoiceschanged = () => s.getVoices();
  } catch {
    // ignore
  }
}

/** Meilleure voix arabe disponible (web), ou null si aucune (on parlera quand même). */
function bestArabicVoice(): any | null {
  if (!isWeb) return null;
  const s = synth();
  if (!s?.getVoices) return null;
  const voices: any[] = s.getVoices() || [];
  const ar = voices.filter((v) => (v.lang || '').toLowerCase().startsWith('ar'));
  if (!ar.length) return null;
  ar.sort((a, b) => voiceScore(b) - voiceScore(a));
  return ar[0];
}
function voiceScore(v: any): number {
  const lang = (v.lang || '').toLowerCase();
  const name = (v.name || '').toLowerCase();
  let s = 0;
  if (lang === 'ar-ma') s += 12;
  else if (lang.startsWith('ar')) s += 6;
  // On privilégie FORTEMENT une voix FÉMININE (Moulat Niya est une femme).
  if (/female|femme|woman|fatima|laila|layla|hala|salma|maryam|amira|hoda|hala|sara|nora|laura|female/.test(name)) s += 8;
  if (/male|homme|man|\bahmed\b|\bkhalid\b|\bnaayf\b/.test(name)) s -= 6; // évite les voix masculines
  if (/google/.test(name)) s += 3; // voix Google (en ligne) = bonne qualité
  return s;
}

/**
 * Nettoie le texte AVANT lecture vocale : retire emojis et symboles décoratifs
 * (sinon le moteur prononce « 🌙 » → « croissant de lune »/« هلال »), ainsi que
 * les '*' et autres marques. Garde lettres arabes, chiffres et ponctuation utile.
 */
export function cleanForSpeech(text: string): string {
  return text
    // Emojis & pictogrammes (plages Unicode usuelles).
    .replace(
      /[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2190}-\u{21FF}\u{2B00}-\u{2BFF}\u{FE00}-\u{FE0F}\u{1F1E6}-\u{1F1FF}\u{200D}]/gu,
      '',
    )
    .replace(/[*_#`~|<>]/g, ' ') // marques markdown/techniques
    .replace(/\s{2,}/g, ' ')
    .trim();
}

/**
 * « Débloque » l'audio : à appeler sur le premier tap/clic utilisateur.
 * Sur Chrome, la synthèse est muette tant qu'aucun geste n'a eu lieu ; on émet
 * une micro-utterance vide pour amorcer le moteur.
 */
let audioUnlocked = false;
export function unlockAudio(): void {
  if (!isWeb || audioUnlocked) return;
  const s = synth();
  if (!s) return;
  try {
    s.cancel();
    const u = new (window as any).SpeechSynthesisUtterance(' ');
    u.volume = 0; // silencieux
    u.lang = SPEAK_LANG;
    s.speak(u);
    audioUnlocked = true;
  } catch {
    // ignore
  }
}

// Garde-en-vie : Chrome met en pause les longues phrases ; resume() régulier.
let keepAlive: ReturnType<typeof setInterval> | null = null;
function startKeepAlive() {
  const s = synth();
  if (!s) return;
  stopKeepAlive();
  keepAlive = setInterval(() => {
    try {
      if (s.speaking) s.resume();
      else stopKeepAlive();
    } catch {
      stopKeepAlive();
    }
  }, 4000);
}
function stopKeepAlive() {
  if (keepAlive) {
    clearInterval(keepAlive);
    keepAlive = null;
  }
}

/**
 * Fait parler Moulat Niya en darija marocaine (ar-MA). `text` en lettres arabes.
 * Parle TOUJOURS (aucune installation manuelle de voix requise).
 */
export function speak(text: string, handlers?: { onStart?: () => void; onDone?: () => void }): void {
  // On ne prononce JAMAIS les emojis/symboles (ex. 🌙 -> « croissant de lune »).
  const spoken = cleanForSpeech(text);
  if (!spoken) {
    handlers?.onDone?.();
    return;
  }
  if (isWeb) {
    const s = synth();
    if (!s || typeof (window as any).SpeechSynthesisUtterance === 'undefined') {
      handlers?.onDone?.();
      return;
    }
    try {
      s.cancel(); // coupe toute lecture précédente
    } catch {
      // ignore
    }
    const u = new (window as any).SpeechSynthesisUtterance(spoken);
    u.lang = SPEAK_LANG; // darija marocaine ; le moteur fait au mieux
    const v = bestArabicVoice();
    if (v) u.voice = v; // voix féminine arabe si dispo
    u.pitch = 1.1; // un peu plus haut = voix féminine plus naturelle
    u.rate = 0.95;
    u.onstart = () => {
      startKeepAlive();
      handlers?.onStart?.();
    };
    const done = () => {
      stopKeepAlive();
      handlers?.onDone?.();
    };
    u.onend = done;
    u.onerror = done;
    try {
      s.speak(u);
    } catch {
      done();
    }
    return;
  }

  // Mobile : expo-speech, voix arabe système.
  try {
    Speech.stop();
  } catch {
    // ignore
  }
  Speech.speak(spoken, {
    language: SPEAK_LANG,
    pitch: 1.1,
    rate: 0.92,
    onStart: handlers?.onStart,
    onDone: handlers?.onDone,
    onStopped: handlers?.onDone,
    onError: handlers?.onDone,
  });
}

/** Arrête toute synthèse en cours. */
export function stopSpeaking(): void {
  stopKeepAlive();
  if (isWeb) {
    try {
      synth()?.cancel();
    } catch {
      // ignore
    }
    return;
  }
  try {
    Speech.stop();
  } catch {
    // ignore
  }
}

// --- Reconnaissance vocale (web) -------------------------------------------

type ListenHandle = { stop: () => void };

export function isListeningSupported(): boolean {
  if (!isWeb) return false;
  const w: any = typeof window !== 'undefined' ? window : null;
  return !!(w && (w.SpeechRecognition || w.webkitSpeechRecognition));
}

export function listen(
  onResult: (text: string, isFinal: boolean) => void,
  opts?: { onEnd?: () => void; onError?: (e: string) => void },
): ListenHandle | null {
  if (!isListeningSupported()) return null;
  const w: any = window;
  const Rec = w.SpeechRecognition || w.webkitSpeechRecognition;
  const rec = new Rec();
  rec.lang = 'ar-MA';
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
  return {
    stop: () => {
      try {
        rec.stop();
      } catch {
        // ignore
      }
    },
  };
}
