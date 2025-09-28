// api/index.js (Vercel)
import app, { initDb } from '../src/app.js';

let ready = false;

export default async function handler(req, res) {
  try {
    if (!ready) {
      await initDb();   // conecta e sincroniza uma única vez por runtime
      ready = true;
    }
    return app(req, res);
  } catch (err) {
    console.error('[initDb error]', err);
    const message =
      (err && err.message) || 'Unknown init error';
    res.status(500).json({ error: 'init_failed', message });
  }
}
