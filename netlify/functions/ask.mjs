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

  const key = (process.env.AI_API_KEY || '').trim();
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

  // Auto-détection du fournisseur d'après le format de la clé.
  const isGroq = key.startsWith('gsk_');
  const baseUrl = (process.env.AI_BASE_URL || (isGroq ? 'https://api.groq.com/openai/v1' : 'https://api.openai.com/v1')).replace(/\/+$/, '');
  const model = process.env.AI_MODEL || (isGroq ? 'llama-3.3-70b-versatile' : 'gpt-4o-mini');

  try {
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
    if (!r.ok) return json({ error: 'upstream', status: r.status }, 502);
    const data = await r.json();
    const text = (data?.choices?.[0]?.message?.content || '').trim();
    if (!text) return json({ error: 'empty' }, 502);
    return json({ text }, 200);
  } catch {
    return json({ error: 'upstream_unreachable' }, 502);
  }
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
