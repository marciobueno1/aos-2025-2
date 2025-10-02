import "dotenv/config";
import cors from "cors";
import express from "express";

import models, { sequelize } from "./models";
import routes from "./routes";

const app = express();
app.set("trust proxy", true);

var corsOptions = {
  origin: ["http://example.com", "*"],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

// Código para conseguir extrair o conteúdo do body da mensagem HTTP
// e armazenar na propriedade req.body (utiliza o body-parser)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Código para injetar no context o usuário que está logado e os models
app.use(async (req, res, next) => {
  req.context = {
    models,
    me: await models.User.findByPk(1),
  };
  next();
});

app.use("/", routes.root);
app.use("/session", routes.session);
app.use("/users", routes.user);
app.use("/messages", routes.message);
app.use("/tarefas", routes.tarefa);

const port = process.env.PORT ?? 3000;

const eraseDatabaseOnSync = process.env.ERASE_DATABASE === "true";

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
    createUsersWithMessages();
  }

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
  });
});

const createUsersWithMessages = async () => {
  await models.User.create(
    {
      username: "rwieruch",
      email: "rwieruch@email.com",
      messages: [
        {
          text: "Published the Road to learn React",
        },
        {
          text: "Published also the Road to learn Express + PostgreSQL",
        },
      ],
    },
    {
      include: [models.Message],
    }
  );

  await models.User.create(
    {
      username: "ddavids",
      email: "ddavids@email.com",
      messages: [
        {
          text: "Happy to release ...",
        },
        {
          text: "Published a complete ...",
        },
      ],
    },
    {
      include: [models.Message],
    }
  );
};
