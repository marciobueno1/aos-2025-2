// api/index.js (Vercel)
import app, { initDb } from '../src/app.js';

let ready = false;

export default async function handler(req, res) {
  if (!ready) {
    await initDb();   // conecta e sincroniza uma única vez
    ready = true;
  }
  // Express é um handler (req, res)
  return app(req, res);
}
