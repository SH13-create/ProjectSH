/**
 * 🤖 Client IA de Moulat Niya.
 *
 * Envoie la question de l'utilisateur à un modèle de langage (compatible API
 * OpenAI : OpenAI, Groq, OpenRouter, Together…) et reçoit une réponse
 * intelligente EN DARIJA MAROCAINE. Si aucune clé n'est configurée ou si l'appel
 * échoue, on retombe sur le moteur LOCAL déterministe (oracle) — l'app reste donc
 * fonctionnelle de bout en bout dans tous les cas.
 *
 * ⚙️ Configuration (variables d'environnement Expo, préfixe EXPO_PUBLIC_) :
 *   EXPO_PUBLIC_AI_API_KEY   = ta clé API
 *   EXPO_PUBLIC_AI_BASE_URL  = (optionnel) ex. https://api.openai.com/v1
 *                              ou https://api.groq.com/openai/v1
 *   EXPO_PUBLIC_AI_MODEL     = (optionnel) ex. gpt-4o-mini, llama-3.1-8b-instant
 *
 * ⚠️ Pour un prototype, la clé est côté client. En production, passe par un
 * petit proxy serveur pour ne pas exposer la clé.
 */
import type { Strings } from '@/locales';
import { askOracle } from './oracle';

const API_KEY = (process.env.EXPO_PUBLIC_AI_API_KEY || '').trim();

// Auto-détection du fournisseur d'après le format de la clé, pour que la CLÉ
// SEULE suffise (sans devoir aussi renseigner BASE_URL / MODEL) :
//  - clé Groq    : commence par "gsk_"  → API Groq + modèle Llama 3.x
//  - clé OpenAI  : commence par "sk-"   → API OpenAI + gpt-4o-mini
const isGroqKey = API_KEY.startsWith('gsk_');
const DEFAULT_BASE = isGroqKey ? 'https://api.groq.com/openai/v1' : 'https://api.openai.com/v1';
const DEFAULT_MODEL = isGroqKey ? 'llama-3.3-70b-versatile' : 'gpt-4o-mini';

const BASE_URL = (process.env.EXPO_PUBLIC_AI_BASE_URL || DEFAULT_BASE).replace(/\/+$/, '');
const MODEL = process.env.EXPO_PUBLIC_AI_MODEL || DEFAULT_MODEL;

export function isAiConfigured(): boolean {
  return API_KEY.length > 0;
}

// Personnage + consignes : darija marocaine, chaleureux, fictif/divertissement.
const SYSTEM_PROMPT = `Nta/Nti "Moulat Niya", chaffara/voyante marocaine f application dyal tasliya.
Jaweb DAIMAN b DARIJA maghribiya b l-7oruf l-3arabiya (ماشي fos7a, ماشي français, ماشي anglais).
Koun 7anina, daffya, motafa2ila w mochajji3a, b loubdan dyal voyante (كانشوف، النجوم كتقول، الفنجان...).
Jaweb b joj wla tlata djmel، 9sar w wad7. Bla ما تكتب emojis بزاف (وحدة بركة إلا بغيتي).
Hadchi kollo TASLIYA/divertissement، ماشي توقع حقيقي. Ma t3tich nasi7a tibbiya wla 9anouniya wla maliya jaddiya.
Khatib l-mستعمل ب "آ ولدي" wla "آ بنتي" wla bla.`;

/**
 * Pose la question à l'IA. Renvoie la réponse en darija (lettres arabes).
 * Repli automatique sur l'oracle local en cas d'absence de clé / d'erreur.
 */
export async function askAI(question: string, tArabic: Strings): Promise<string> {
  if (!isAiConfigured()) {
    return askOracle(question, tArabic).text;
  }
  try {
    const res = await fetch(`${BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        temperature: 0.9,
        max_tokens: 220,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: question },
        ],
      }),
    });
    if (!res.ok) throw new Error(`AI ${res.status}`);
    const data = await res.json();
    const text: string = data?.choices?.[0]?.message?.content?.trim() || '';
    if (!text) throw new Error('empty');
    return text;
  } catch {
    // Repli local : l'app reste fonctionnelle.
    return askOracle(question, tArabic).text;
  }
}
