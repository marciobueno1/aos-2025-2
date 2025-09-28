import app, { initDb } from '../src/app.js';

let ready = false;

export default async function handler(req, res) {
  try {
    // /api/health sem tocar no DB, só p/ ver status online
    if (req.url && req.url.startsWith('/api/health')) {
      return res.status(200).json({ status: 'ok' });
    }

    if (!ready) {
      await initDb(); // conecta/sincroniza uma única vez por runtime
      ready = true;
    }
    return app(req, res); // delega para o Express
  } catch (err) {
    console.error('[initDb error]', err);
    res
      .status(500)
      .json({ error: 'init_failed', message: err?.message || 'unknown' });
  }
}
