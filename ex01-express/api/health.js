// api/health.js — NÃO importa app/Sequelize
export default function handler(req, res) {
  res.status(200).json({
    status: 'ok',
    hasDatabaseUrl: !!process.env.DATABASE_URL,
    pg: {
      host: !!process.env.PG_HOST,
      db: !!process.env.PG_DATABASE,
      user: !!process.env.PG_USER,
      ssl: String(process.env.PG_SSL ?? 'unset'),
    },
    vercelEnv: process.env.VERCEL_ENV || 'local/unknown'
  });
}
