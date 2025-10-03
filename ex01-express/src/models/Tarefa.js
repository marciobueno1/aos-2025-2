import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/sequelize.js';

class Tarefa extends Model {}

Tarefa.init(
  {
    objectId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,        // chave primária string (UUID)
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
    concluida: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,     // padrão false
    },
  },
  { sequelize, modelName: 'Tarefa', tableName: 'tarefas', timestamps: true }
);

export default Tarefa;
