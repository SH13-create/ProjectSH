/**
 * 🤖 Client IA de Moulat Niya — SÉCURISÉ (aucune clé côté frontend).
 *
 * Le frontend appelle UNIQUEMENT un proxy backend de même origine (/api/ask).
 * La clé API et le fournisseur (Groq/OpenAI…) restent côté serveur (Netlify
 * Function). Si le proxy n'est pas déployé ou échoue, on retombe sur le moteur
 * LOCAL déterministe (oracle) → l'app reste fonctionnelle de bout en bout.
 *
 * 👉 Voir netlify/functions/ask.ts pour le proxy + variables d'env serveur.
 */
import type { Strings } from '@/locales';
import { askOracle } from './oracle';

// Endpoint du proxy (même origine). Configurable si besoin via EXPO_PUBLIC_AI_PROXY_URL,
// mais AUCUNE clé n'est jamais exposée ici.
const PROXY_URL = (process.env.EXPO_PUBLIC_AI_PROXY_URL || '/api/ask').trim();

/**
 * Pose la question à l'IA via le proxy backend. Renvoie la réponse en darija.
 * Repli automatique sur l'oracle local si le proxy est absent / en erreur.
 */
export async function askAI(question: string, tArabic: Strings): Promise<string> {
  try {
    const res = await fetch(PROXY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question }),
    });
    if (!res.ok) throw new Error(`proxy ${res.status}`);
    const data = await res.json();
    const text: string = (data?.text || '').trim();
    if (!text) throw new Error('empty');
    return text;
  } catch {
    // Proxy non déployé ou erreur réseau → réponse locale (app toujours utilisable).
    return askOracle(question, tArabic).text;
  }
}
