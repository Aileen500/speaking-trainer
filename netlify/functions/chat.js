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
      body: JSON.stringify({ model: 'kimi-k2.6', messages, temperature: 0.8, max_tokens: 150 })
    });
    const data = await r.json();
    const reply = data.choices?.[0]?.message?.content
               ?? data.choices?.[0]?.messages?.find(m=>m.role==='assistant')?.content;
    if (!reply) return { statusCode: 502, body: JSON.stringify(data) };
    return { statusCode: 200, body: JSON.stringify({ reply }) };
  } catch (e) {
    return { statusCode: 500, body: String(e) };
  }
};
