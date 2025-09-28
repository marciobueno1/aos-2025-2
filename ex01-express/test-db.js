import 'dotenv/config';
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: { require: true, rejectUnauthorized: false },
  },
  logging: false,
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conectado ao banco com sucesso!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Erro na conexão:', err);
    process.exit(1);
  }
})();
