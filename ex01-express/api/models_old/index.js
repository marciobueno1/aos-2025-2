import Sequelize from "sequelize";

import getUserModel from "./user";
import getMessageModel from "./message";

//POSTGRES_URL
const sequelize = new Sequelize(process.env.POSTGRES_URL, {
  dialect: "postgres",
  protocol: "postgres",
  // logging: false, // Disable SQL query logging
  dialectOptions: {
    // Necessary for SSL on NeonDB, Render.com and other providers
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  dialectModule: require("pg"),
});

const models = {
  User: getUserModel(sequelize, Sequelize),
  Message: getMessageModel(sequelize, Sequelize),
};

Object.keys(models).forEach((key) => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;
