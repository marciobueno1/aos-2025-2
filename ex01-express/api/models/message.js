import { DataTypes } from 'sequelize';

const getMessageModel = (sequelize) => {
  const Message = sequelize.define('message', {
    text: {
      type: DataTypes.STRING, // Agora 'DataTypes' está definido
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });

  Message.associate = (models) => {
    Message.belongsTo(models.User);
  };

  return Message;
};

export default getMessageModel;

