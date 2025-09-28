import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/sequelize.js';

class User extends Model {}

User.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
  },
  { sequelize, modelName: 'User', tableName: 'users', timestamps: true }
);

export default User;
