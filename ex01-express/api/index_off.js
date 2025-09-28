// api/index.js (Vercel)
import app, { initDb } from '../src/app.js';

let ready = false;

export default async function handler(req, res) {
  try {
    // Se for apenas health, não inicializa DB
    if (req.url && req.url.startsWith('/api/health')) {
      return res.status(200).json({
        status: 'ok',
        hasDatabaseUrl: !!process.env.DATABASE_URL,
        pg: {
          host: !!process.env.PG_HOST,
          db: !!process.env.PG_DATABASE,
          user: !!process.env.PG_USER,
          ssl: String(process.env.PG_SSL ?? 'unset'),
        },
      });
    }

    // Para as demais rotas, inicializa DB uma única vez
    if (!ready) {
      await initDb();
      ready = true;
    }

    // Delegar para o Express
    return app(req, res);
  } catch (err) {
    console.error('[initDb error]', err);
    res.status(500).json({ error: 'init_failed', message: err?.message || 'unknown' });
  }
}
