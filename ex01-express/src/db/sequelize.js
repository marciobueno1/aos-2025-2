import 'dotenv/config';
import { Sequelize } from 'sequelize';

const hasUrl = typeof process.env.DATABASE_URL === 'string' && process.env.DATABASE_URL.trim().length > 0;
const useUrl = hasUrl;

if (useUrl) {
  console.log('[db] mode=URL hasUrl=true');
} else {
  console.log('[db] mode=PG_* hasUrl=false host=%s db=%s ssl=%s',
    process.env.PG_HOST ? 'set' : 'unset',
    process.env.PG_DATABASE ? 'set' : 'unset',
    process.env.PG_SSL ? String(process.env.PG_SSL) : 'unset'
  );
}

const sequelize = useUrl
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres',
      protocol: 'postgres',
      logging: false,
      dialectOptions: { ssl: { require: true, rejectUnauthorized: false } },
    })
  : new Sequelize(
      process.env.PG_DATABASE,
      process.env.PG_USER,
      process.env.PG_PASSWORD,
      {
        host: process.env.PG_HOST,
        port: process.env.PG_PORT || 5432,
        dialect: 'postgres',
        logging: false,
        dialectOptions: process.env.PG_SSL === 'true' || process.env.PG_SSL === true
          ? { ssl: { require: true, rejectUnauthorized: false } }
          : {},
      }
    );

export default sequelize;
