import getUserModel from './user.js';
import getMessageModel from './message.js';
import { Sequelize } from 'sequelize';

// 1. Cria a instância do Sequelize usando a URL do banco de dados do .env
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
});

// 2. Carrega os modelos
const models = {
  User: getUserModel(sequelize, Sequelize.DataTypes),
  Message: getMessageModel(sequelize, Sequelize.DataTypes),
};

// 3. Define as associações entre os modelos
Object.keys(models).forEach((key) => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };
export default models;

