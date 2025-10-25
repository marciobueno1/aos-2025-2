import { DataTypes } from 'sequelize';

// Recebe apenas sequelize como argumento
const getPessoaModel = (sequelize) => {
  const Pessoa = sequelize.define('pessoa', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    idade: {
        type: DataTypes.INTEGER,
        allowNull: true, // Tornar opcional para evitar erros
    },
    resumo: {
      type: DataTypes.TEXT,
    },
    linkedinUrl: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true,
      },
    },
    githubUrl: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true,
      },
    },
  });

  // Define as associações com aliases no PLURAL
  Pessoa.associate = (models) => {
    // Garanta que os aliases 'as:' estão exatamente assim:
    Pessoa.hasMany(models.Experiencia, { as: 'experiencias', onDelete: 'CASCADE' });
    Pessoa.hasMany(models.Formacao,    { as: 'formacoes',    onDelete: 'CASCADE' });
    Pessoa.hasMany(models.Habilidade,  { as: 'habilidades',  onDelete: 'CASCADE' });
  };

  return Pessoa;
};

export default getPessoaModel;