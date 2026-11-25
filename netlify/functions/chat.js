// netlify/functions/chat.js
exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'POST only' };
  const { messages } = JSON.parse(event.body || '{}');
  if (!Array.isArray(messages)) return { statusCode: 400, body: 'messages required' };
  try {
    const r = await fetch('https://api.moonshot.cn/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.MOONSHOT_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'kimi-k3',
        reasoning_effort: 'low',
        messages,
        temperature: 1,
        max_tokens: 300
      })
    });
    const raw = await r.text();
    if (!r.ok) return { statusCode: 502, body: 'moonshot '+r.status+': '+raw.slice(0,200) };
    let data = {};
    try { data = JSON.parse(raw); } catch(e) {}
    const reply = data.choices?.[0]?.message?.content ?? null;
    if (!reply) return { statusCode: 502, body: 'no reply: '+raw.slice(0,200) };
    return { statusCode: 200, body: JSON.stringify({ reply }) };
  } catch (e) {
    return { statusCode: 500, body: String(e) };
  }
};
