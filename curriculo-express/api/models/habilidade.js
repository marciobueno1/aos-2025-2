import { DataTypes } from 'sequelize';

const getHabilidadeModel = (sequelize) => {
  const Habilidade = sequelize.define('habilidade', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false, // Pode haver a mesma habilidade para pessoas diferentes
    },
    nivel: {
      type: DataTypes.ENUM('Básico', 'Intermediário', 'Avançado', 'Fluente'), // Exemplo de níveis
      allowNull: true,
    },
  });

  // Define a associação: Uma Habilidade pertence a uma Pessoa
  Habilidade.associate = (models) => {
    Habilidade.belongsTo(models.Pessoa); // Cria a chave estrangeira 'pessoaId'
  };

  return Habilidade;
};

export default getHabilidadeModel;
