const getTarefaModel = (sequelize, { DataTypes }) => {
  const Tarefa = sequelize.define("tarefa", {
    objectId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "A descrição da tarefa é obrigatória",
        },
      },
    },
    concluida: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  Tarefa.associate = (models) => {
    Tarefa.belongsTo(models.User);
  };

  return Tarefa;
};

export default getTarefaModel;