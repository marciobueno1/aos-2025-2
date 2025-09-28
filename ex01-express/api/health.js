// função mínima, sem Express/Sequelize e sem res.json()
export default (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({
    status: 'ok-min',
    hasDatabaseUrl: !!process.env.DATABASE_URL,
    pg: {
      host: !!process.env.PG_HOST,
      db: !!process.env.PG_DATABASE,
      user: !!process.env.PG_USER,
      ssl: String(process.env.PG_SSL ?? 'unset'),
    },
    vercelEnv: process.env.VERCEL_ENV || 'unknown'
  }));
};
