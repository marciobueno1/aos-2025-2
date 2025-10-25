import { DataTypes } from 'sequelize';

const getExperienciaModel = (sequelize) => {
  const Experiencia = sequelize.define('experiencia', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    cargo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    empresa: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dataInicio: {
      type: DataTypes.DATEONLY, // Apenas data, sem hora
    },
    dataFim: {
      type: DataTypes.DATEONLY,
      allowNull: true, // Permite ser nulo (emprego atual)
    },
    descricao: {
      type: DataTypes.TEXT,
    },
  });

  // Define a associação: Uma Experiencia pertence a uma Pessoa
  Experiencia.associate = (models) => {
    Experiencia.belongsTo(models.Pessoa); // Cria a chave estrangeira 'pessoaId'
  };

  return Experiencia;
};

export default getExperienciaModel;
