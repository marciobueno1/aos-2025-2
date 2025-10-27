import "dotenv/config";
import cors from "cors";
import express from "express";
import jwt from "jsonwebtoken";

import models, { sequelize } from "./models";
import routes from "./routes";
import errorMiddleware from "./middleware/errorMiddleware"; // Import the error middleware

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

app.use(async (req, res, next) => {
  req.context = {
    models,
  };

  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      req.context.me = await models.User.findByPk(payload.id);
    } catch (e) {
      // Token is invalid
      console.log("Invalid token:", e);
    }
  }

  next();
});

app.use("/", routes.root);
app.use("/auth", routes.auth);
app.use("/users", routes.user);
app.use("/messages", routes.message);
app.use("/tarefas", routes.tarefa);

// Add the error middleware as the last middleware
app.use(errorMiddleware);

const port = process.env.PORT ?? 3000;

const eraseDatabaseOnSync = process.env.ERASE_DATABASE === "true";

sequelize
  .sync({ force: eraseDatabaseOnSync })
  .then(async () => {
    if (eraseDatabaseOnSync) {
      createUsersWithMessages();
    }

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}!`);
    });
  })
  .catch((error) => {
    console.error("Error starting the server:", error);
  });

const createUsersWithMessages = async () => {
  try {
    await models.User.create(
      {
        username: "rwieruch",
        email: "rwieruch@email.com",
        password: "rwieruch123",
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
        password: "ddavids123",
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
  } catch (error) {
    console.error(error);
  }
};
