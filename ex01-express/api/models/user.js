import { DataTypes } from 'sequelize';

const getUserModel = (sequelize) => {
  const User = sequelize.define('user', {
    username: {
      type: DataTypes.STRING, 
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });

  User.associate = (models) => {
    User.hasMany(models.Message, { onDelete: 'CASCADE' });
  };

  return User;
};

export default getUserModel;

