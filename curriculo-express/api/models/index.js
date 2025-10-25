import { Sequelize } from 'sequelize';
import pg from 'pg';

import getPessoaModel from './pessoa.js';
import getExperienciaModel from './experiencia.js';
import getFormacaoModel from './formacao.js';
import getHabilidadeModel from './habilidade.js';

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectModule: pg,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

// Carrega cada modelo, passando a instância do sequelize
const models = {
  Pessoa: getPessoaModel(sequelize),
  Experiencia: getExperienciaModel(sequelize),
  Formacao: getFormacaoModel(sequelize),
  Habilidade: getHabilidadeModel(sequelize),
};

// Executa o método 'associate' de cada modelo (se existir)
Object.keys(models).forEach((key) => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});


export { sequelize };
export default models; 

