/**
 * 🔮 « Oracle » conversationnel de Moulat Niya — 100% LOCAL & FICTIF.
 *
 * À partir d'une question libre (texte ou dictée vocale), on détecte un thème
 * par mots-clés (amour, travail, argent, santé, futur, oui/non…) puis on
 * renvoie une réponse chaleureuse choisie de façon DÉTERMINISTE (même question
 * → même réponse). Aucun appel réseau, aucune IA distante : c'est un
 * divertissement, pas une vraie prédiction.
 */
import type { Strings } from '@/locales';

export type Topic = 'love' | 'work' | 'money' | 'health' | 'future' | 'yesno' | 'generic';

/** Hash déterministe (djb2). */
function hash(str: string): number {
  let h = 5381;
  for (let i = 0; i < str.length; i++) h = (h * 33) ^ str.charCodeAt(i);
  return Math.abs(h);
}

/**
 * Sélection DÉTERMINISTE-PAR-JOUR : renvoie le même élément du tableau pour
 * toute la journée (change automatiquement chaque jour). Aucun stockage requis.
 * `salt` permet d'avoir des sélections différentes le même jour (ex. conseil vs
 * mot du jour).
 */
export function dailyPick<T>(pool: T[], date: Date = new Date(), salt = ''): T {
  if (!pool.length) return undefined as unknown as T;
  const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${salt}`;
  return pool[hash(key) % pool.length];
}

// Mots-clés par thème : darija (arabe), arabizi/latin et français/anglais.
const KEYWORDS: Record<Exclude<Topic, 'generic'>, string[]> = {
  love: ['حب', 'حبيب', 'عشق', 'زواج', 'خطوبة', 'قلب', 'علاقة', '7ob', '7bib', 'zwaj', 'galb', 'love', 'amour', 'mariage', 'couple', 'crush'],
  work: ['خدمة', 'عمل', 'وظيفة', 'مشروع', 'دراسة', 'قراية', 'khedma', '5edma', 'projet', 'travail', 'job', 'work', 'study', 'career', 'kariir'],
  money: ['فلوس', 'مال', 'دراهم', 'رزق', 'flous', 'money', 'argent', 'rze9', 'rizq', 'cash'],
  health: ['صحة', 'مرض', 'تعب', 's77a', 'sa77a', 'sante', 'santé', 'health', 'maladie', 'malade'],
  future: ['مستقبل', 'غادي', 'مكتوب', 'قدر', 'mosta9bal', 'mostakbal', 'futur', 'future', 'destin', 'mektoub', 'avenir', 'demain', 'غدا', 'عام'],
  yesno: ['واش', 'wach', 'wch', '?', '؟'],
};

function detectTopic(q: string): Topic {
  const t = q.toLowerCase();
  // On teste les thèmes "forts" avant le oui/non générique.
  const order: Exclude<Topic, 'generic'>[] = ['love', 'work', 'money', 'health', 'future', 'yesno'];
  for (const topic of order) {
    if (KEYWORDS[topic].some((k) => t.includes(k.toLowerCase()))) return topic;
  }
  return 'generic';
}

function poolFor(v: Strings['voice'], topic: Topic): string[] {
  switch (topic) {
    case 'love': return v.answersLove;
    case 'work': return v.answersWork;
    case 'money': return v.answersMoney;
    case 'health': return v.answersHealth;
    case 'future': return v.answersFuture;
    case 'yesno': return v.answersYesNo;
    default: return v.answersGeneric;
  }
}

export type OracleReply = { topic: Topic; text: string };

/** Construit la réponse de Moulat Niya à une question libre. */
export function askOracle(question: string, t: Strings): OracleReply {
  const v = t.voice;
  const q = question.trim();
  const topic = detectTopic(q);
  const pool = poolFor(v, topic);
  const seed = hash(q || 'salam');
  let text = pool[seed % pool.length];

  // On ajoute RAREMENT une petite phrase de clôture (1 sur 5), pour éviter la
  // répétition : les réponses sont désormais auto-suffisantes.
  if (v.closing.length && seed % 5 === 0) {
    text = `${text} ${v.closing[seed % v.closing.length]}`;
  }
  return { topic, text };
}
