// api/chat.js — 部署到 Vercel 后自动成为 /api/chat
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });
  const { messages } = req.body || {};
  if (!Array.isArray(messages)) return res.status(400).json({ error: 'messages required' });

  try {
    const r = await fetch('https://api.moonshot.cn/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.MOONSHOT_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'kimi-k2.6',
        messages,
        temperature: 0.8,
        max_tokens: 150
      })
    });
    const data = await r.json();
    const reply = data.choices?.[0]?.message?.content
               ?? data.choices?.[0]?.messages?.find(m=>m.role==='assistant')?.content;
    if (!reply) return res.status(502).json({ error: 'no reply', raw: data });
    res.status(200).json({ reply });
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
}
