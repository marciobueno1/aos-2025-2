module.exports = (req, res) => {
  try {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      status: 'ok-min-js',
      hasDatabaseUrl: !!process.env.DATABASE_URL,
      vercelEnv: process.env.VERCEL_ENV || 'unknown'
    }));
  } catch (e) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('health error');
  }
};
