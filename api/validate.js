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

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'API key not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const prompt = type === 'adj'
    ? `Is "${word}" a descriptive adjective in English (a word that describes a quality, like "fierce" or "electric")? Reply with only "yes" or "no".`
    : `Is "${word}" a real animal in English (like "falcon" or "cobra")? Reply with only "yes" or "no".`;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 5,
      messages: [{ role: 'user', content: prompt }]
    })
  });

  const data = await response.json();

  if (!response.ok || data.type === 'error') {
    return new Response(JSON.stringify({ valid: false, error: data?.error?.message || 'API error' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  }

  const answer = data?.content?.[0]?.text?.trim().toLowerCase();
  const valid = answer === 'yes';

  return new Response(JSON.stringify({ valid, word, type }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
}
