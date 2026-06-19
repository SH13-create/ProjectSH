/**
 * 🔒 Proxy IA sécurisé (Netlify Function) pour Moulat Niya.
 *
 * La clé API et le fournisseur restent CÔTÉ SERVEUR (variables d'environnement
 * Netlify) — jamais exposés au navigateur. Le frontend appelle /api/ask avec
 * juste { question }, et reçoit { text }.
 *
 * Variables d'environnement à définir dans Netlify (Site settings → Environment):
 *   AI_API_KEY   (obligatoire)  ex. clé Groq "gsk_..." ou OpenAI "sk-..."
 *   AI_BASE_URL  (optionnel)    auto-détecté d'après la clé sinon
 *   AI_MODEL     (optionnel)    auto-détecté d'après la clé sinon
 *
 * Aucune dépendance : utilise le fetch global de Node 18+.
 */

const SYSTEM_PROMPT = `Nti "Moulat Niya", chaffara/voyante marocaine daffya f application dyal tasliya.
Jaweb DAIMAN b DARIJA maghribiya b l-7oruf l-3arabiya (machi fos7a, machi français, machi anglais).
Shakhsiya: 7anina, dakiya, 9riba men l-9alb, w 3andha khfet dem (humour khafif) men we9t l akhor — bla ma tsthzi b 7tta 7ed.
Tul l-jawab: joj wla tlata jmel SGHAR (9sir w wad7). Nawwe3 l-3ibarat, machi dima nafs l-bidaya.
Bla emojis. Hadchi TASLIYA, machi taw9i3 7a9i9i. Ma t3tich nasi7a tibbiya/9anouniya/maliya jaddiya.`;

export default async function handler(req) {
  // CORS / méthode
  if (req.method === 'OPTIONS') {
    return new Response('', { status: 204, headers: cors() });
  }
  if (req.method !== 'POST') {
    return json({ error: 'method' }, 405);
  }

  // Détecte si une valeur ressemble à une CLÉ (et non à un nom de fournisseur).
  const looksLikeKey = (v) =>
    /^(AIza|AQ\.|gsk_|sk-)/.test(v) || (v.length > 24 && !/^(gemini|groq|openai)$/i.test(v));

  const rawProvider = (process.env.AI_PROVIDER || '').trim();
  // Tolérance : la clé peut être dans AI_API_KEY, GEMINI_API_KEY, ou (par erreur)
  // directement dans AI_PROVIDER.
  const key = (
    (process.env.AI_API_KEY || '').trim() ||
    (process.env.GEMINI_API_KEY || '').trim() ||
    (looksLikeKey(rawProvider) ? rawProvider : '')
  ).trim();

  if (!key) {
    // Pas de clé configurée → le frontend basculera sur son moteur local.
    return json({ error: 'not_configured' }, 503);
  }

  let question = '';
  try {
    const body = await req.json();
    question = String(body?.question || '').slice(0, 500).trim();
  } catch {
    return json({ error: 'bad_request' }, 400);
  }
  if (!question) return json({ error: 'empty_question' }, 400);

  // Choix du fournisseur : AI_PROVIDER (s'il nomme un fournisseur), sinon
  // auto-détection d'après le format de la clé.
  const namedProvider = /^(gemini|groq|openai)$/i.test(rawProvider) ? rawProvider.toLowerCase() : '';
  const provider = namedProvider
    || (key.startsWith('gsk_') ? 'groq' : key.startsWith('AIza') || key.startsWith('AQ.') ? 'gemini' : 'openai');

  try {
    let text = '';
    if (provider === 'gemini') {
      text = await callGemini(key, question);
    } else {
      text = await callOpenAICompatible(provider, key, question);
    }
    if (!text) return json({ error: 'empty' }, 502);
    return json({ text }, 200);
  } catch (e) {
    return json({ error: 'upstream_unreachable' }, 502);
  }
}

/** Appel des API compatibles OpenAI (Groq / OpenAI / OpenRouter…). */
async function callOpenAICompatible(provider, key, question) {
  const isGroq = provider === 'groq';
  const baseUrl = (process.env.AI_BASE_URL || (isGroq ? 'https://api.groq.com/openai/v1' : 'https://api.openai.com/v1')).replace(/\/+$/, '');
  const model = process.env.AI_MODEL || (isGroq ? 'llama-3.3-70b-versatile' : 'gpt-4o-mini');
  const r = await fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
    body: JSON.stringify({
      model,
      temperature: 0.9,
      max_tokens: 160,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: question },
      ],
    }),
  });
  if (!r.ok) throw new Error(`upstream ${r.status}`);
  const data = await r.json();
  return (data?.choices?.[0]?.message?.content || '').trim();
}

/** Appel de l'API Google Gemini (forme generateContent, non-stream). */
async function callGemini(key, question) {
  // Modèle configurable ; défaut sur le modèle demandé.
  const model = process.env.AI_MODEL || 'gemini-3.5-flash';
  const base = (process.env.AI_BASE_URL || 'https://generativelanguage.googleapis.com/v1beta').replace(/\/+$/, '');
  const url = `${base}/models/${model}:generateContent?key=${encodeURIComponent(key)}`;
  const r = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents: [{ role: 'user', parts: [{ text: question }] }],
      generationConfig: {
        temperature: 0.9,
        maxOutputTokens: 400,
        thinkingConfig: { thinkingLevel: 'LOW' }, // réponses courtes & rapides
      },
    }),
  });
  if (!r.ok) throw new Error(`gemini ${r.status}`);
  const data = await r.json();
  const parts = data?.candidates?.[0]?.content?.parts || [];
  return parts.map((p) => p?.text || '').join('').trim();
}

function cors() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}
function json(obj, status) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'Content-Type': 'application/json', ...cors() },
  });
}

// Mappe la fonction sur le chemin /api/ask.
export const config = { path: '/api/ask' };
