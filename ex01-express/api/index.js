// api/index.js
import serverless from 'serverless-http';
import app, { initDb } from '../src/app.js';

let handler;

export default async function(req, res) {
  if (!handler) {
    await initDb();
    handler = serverless(app);
  }
  return handler(req, res);
}
