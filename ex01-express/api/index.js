// api/index.js — lazy import para não tocar no DB em /api/health
let ready = false;
let app = null;
let initDb = null;

export default async function handler(req, res) {
  try {
    // rota de saúde: não importa nada, não conecta DB
    if (req.url && req.url.startsWith('/api/health')) {
      return res.status(200).json({ status: 'ok' });
    }

    // importa o app somente quando precisar (evita erro antes de tempo)
    if (!app) {
      const mod = await import('../src/app.js');
      app = mod.default;
      initDb = mod.initDb;
    }

    if (!ready) {
      await initDb();
      ready = true;
    }

    return app(req, res);
  } catch (err) {
    console.error('[handler error]', err);
    res.status(500).json({ error: 'init_failed', message: err?.message || 'unknown' });
  }
}
