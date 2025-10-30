import bcrypt from 'bcrypt';
import Joi from 'joi';

const getUserModel = (sequelize, { DataTypes }) => {
  const User = sequelize.define(
    "user",
    {
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: true,
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          validatePassword(value) {
            const schema = Joi.string()
              .min(8)
              .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])'))
              .required();
            const { error } = schema.validate(value);
            if (error) {
              throw new Error(
                "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character."
              );
            }
          },
        },
      },
    },
    {
      indexes: [
        {
          fields: ["email"],
        },
        {
          fields: ["username"],
        },
      ],
    }
  );

  User.associate = (models) => {
    User.hasMany(models.Message, { onDelete: "CASCADE" });
  };

  User.findByLogin = async (login) => {
    let user = await User.findOne({
      where: { username: login },
    });

    if (!user) {
      user = await User.findOne({
        where: { email: login },
      });
    }

    return user;
  };

  User.beforeCreate(async (user) => {
    user.password = await user.generatePasswordHash();
  });

  User.prototype.generatePasswordHash = async function () {
    const saltRounds = 10;
    return await bcrypt.hash(this.password, saltRounds);
  };

  User.prototype.validatePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

  return User;
};

export default getUserModel;