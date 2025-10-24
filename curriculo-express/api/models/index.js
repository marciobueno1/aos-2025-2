import Sequelize from "sequelize"

import getPessoaModel from "./pessoa.js";
import getExperienciaModel from "./experiencia.js";
import getFormacaoModel from "./formacao.js";
import getHabilidadesModel from "./habilidades.js";

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

const Pessoa = getPessoaModel(sequelize, Sequelize.DataTypes);
const Experiencia = getExperienciaModel(sequelize, Sequelize.DataTypes);
const Formacao = getFormacaoModel(sequelize, Sequelize.DataTypes);
const Habilidades = getHabilidadesModel(sequelize, Sequelize.DataTypes);

Pessoa.hasMany(Experiencia, { as: 'experiencias', foreignKey: 'pessoaId' });
Experiencia.belongsTo(Pessoa, { foreignKey: 'pessoaId' });

Pessoa.hasMany(Formacao, { as: 'formacoes', foreignKey: 'pessoaId' });
Formacao.belongsTo(Pessoa, { foreignKey: 'pessoaId' });

Pessoa.hasMany(Habilidades, { as: 'habilidades', foreignKey: 'pessoaId' });
Habilidades.belongsTo(Pessoa, { foreignKey: 'pessoaId' });

export { sequelize, Pessoa, Experiencia, Formacao, Habilidades };   


//revisar