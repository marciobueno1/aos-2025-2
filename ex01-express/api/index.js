// api/index.js — handler único para Vercel
let ready = false;
let app = null;
let initDb = null;

export default async function handler(req, res) {
  try {
    // /api/health: responder sem tocar no DB, só pra checagem
    if (req.url && req.url.startsWith('/api/health')) {
      return res.status(200).json({ status: 'ok' });
    }

    // importa o app apenas quando necessário
    if (!app) {
      const mod = await import('../src/app.js');
      app = mod.default;
      initDb = mod.initDb;
    }

    if (!ready) {
      await initDb();   // conecta/sincroniza uma única vez
      ready = true;
    }

    return app(req, res);
  } catch (err) {
    console.error('[handler error]', err);
    res.status(500).json({ error: 'init_failed', message: err?.message || 'unknown' });
  }
}
