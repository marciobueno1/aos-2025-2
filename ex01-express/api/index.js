// api/index.js (Vercel)
import app, { initDb } from '../src/app.js';

let ready = false;

export default async function handler(req, res) {
  try {
    // debug seguro: não mostra o valor, só diz se existe
    const hasUrl = !!process.env.DATABASE_URL;
    console.log('[boot] has DATABASE_URL?', hasUrl);

    if (!ready) {
      await initDb();            // autentica/sincroniza Sequelize uma única vez
      ready = true;
      console.log('[boot] initDb OK');
    }

    // Delegar para o Express
    return app(req, res);
  } catch (err) {
    console.error('[initDb error]', err);
    const message = (err && err.message) || 'Unknown init error';
    res.status(500).json({ error: 'init_failed', message });
  }
}
