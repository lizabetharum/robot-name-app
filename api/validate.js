export const config = { runtime: 'edge' };

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const { word, type } = await req.json();

  if (!word || !type) {
    return new Response(JSON.stringify({ error: 'Missing word or type' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const trimmed = word.trim();
  const isReasonableWord = /^[a-zA-Z\-']{2,20}$/.test(trimmed);

  return new Response(JSON.stringify({ valid: isReasonableWord, word: trimmed, type }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
}
