const getPessoaModel = (sequelize, DataTypes) => {
  const Pessoa = sequelize.define('Pessoa', {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    idade: {
      type: DataTypes.INTEGER,
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
  });

  return Pessoa;
}

export default getPessoaModel;