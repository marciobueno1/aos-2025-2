import { DataTypes } from 'sequelize';
const getTarefaModel = (sequelize) => {
  const Tarefa = sequelize.define('tarefa', {

    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false, 
      validate: {
        notEmpty: true,
      },
    },
    concluida: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });

  return Tarefa;
};

export default getTarefaModel;