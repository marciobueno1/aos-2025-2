import { Sequelize } from 'sequelize';
import getUserModel from './user.js';
import getMessageModel from './message.js';

// 1. Cria a instância do Sequelize usando a URL do banco de dados do .env
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  // ADIÇÃO: Configuração explícita de SSL para produção (Vercel)
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Necessário para conectar ao NeonDB a partir da Vercel
    },
  },
});

// 2. Carrega os modelos
const models = {
  User: getUserModel(sequelize),
  Message: getMessageModel(sequelize),
};

// 3. Define as associações entre os modelos
Object.keys(models).forEach((key) => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };
export default models;