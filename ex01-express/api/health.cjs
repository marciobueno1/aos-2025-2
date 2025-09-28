// Função mínima em CommonJS (sem imports)
module.exports = (req, res) => {
  try {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      status: 'ok-min-cjs',
      hasDatabaseUrl: !!process.env.DATABASE_URL,
      pg: {
        host: !!process.env.PG_HOST,
        db: !!process.env.PG_DATABASE,
        user: !!process.env.PG_USER,
        ssl: String(process.env.PG_SSL ?? 'unset'),
      },
      vercelEnv: process.env.VERCEL_ENV || 'unknown'
    }));
  } catch (e) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('health error');
  }
};
