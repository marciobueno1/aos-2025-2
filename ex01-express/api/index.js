import "dotenv/config";
console.log("process.env.DEBUG_LOGS", process.env.DEBUG_LOGS);

import "./utils/logger.js";
import cors from "cors";
import express from "express";
import jwt from "jsonwebtoken";

import models, { sequelize } from "./models";
import { Op } from "sequelize";
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
  console.debug("DEBUG: Request received for:", req.method, req.path);
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

// Código para conseguir extrair o conteúdo do body da mensagem HTTP
// e armazenar na propriedade req.body (utiliza o body-parser)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
  console.debug("DEBUG: Entering context creation middleware");
  req.context = {
    models,
  };

  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    try {
      console.debug("DEBUG: Token found, attempting to verify...");
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      console.debug("DEBUG: Token verified, payload:", payload);
      req.context.me = await models.User.findByPk(payload.id);
      console.debug("DEBUG: User found and set in context:", req.context.me);
    } catch (e) {
      // Token is invalid
      console.debug("DEBUG: Invalid token:", e);
      console.log("Invalid token:", e);
    }
  }

  console.debug("DEBUG: Exiting context creation middleware");
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

    // Schedule a job to clean up expired blacklisted tokens every 24 hours
    setInterval(async () => {
      try {
        await models.BlacklistedToken.destroy({
          where: {
            expiresAt: {
              [Op.lt]: new Date(),
            },
          },
        });
      } catch (error) {
        console.error("Error cleaning up expired tokens:", error);
      }
    }, 24 * 60 * 60 * 1000); // 24 hours

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
        password: "Rwieruch123!",
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
        password: "Ddavids123!",
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
