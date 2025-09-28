import 'dotenv/config';
import { Sequelize } from 'sequelize';

const useUrl = !!process.env.DATABASE_URL;

const sequelize = useUrl
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres',
      protocol: 'postgres',
      logging: false,
      dialectOptions: {
        ssl: { require: true, rejectUnauthorized: false },
      },
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
        dialectOptions: {
          ssl: process.env.PG_SSL === 'true'
            ? { require: true, rejectUnauthorized: false }
            : false,
        },
      }
    );

export default sequelize;
