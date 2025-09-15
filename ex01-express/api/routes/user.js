import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const users = await req.context.models.User.findAll();
    return res.send(users);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const user = await req.context.models.User.findByPk(req.params.userId);
    if (!user) {
      return res.sendStatus(404);
    }
    return res.send(user);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
});

router.post("/", async (req, res) => {
  try {
    const user = await req.context.models.User.create({
      username: req.body.username,
      email: req.body.email,
    });

    return res.status(201).send(user);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
});

router.put("/:userId", async (req, res) => {
  try {
    if (!req.context.me) {
      return res.status(401).send("Unauthorized");
    }
    const user = await req.context.models.User.findByPk(req.params.userId);
    if (!user) {
      return res.sendStatus(404);
    }
    if (user.id !== req.context.me.id) {
      return res.status(403).send("Forbidden");
    }
    await user.update(req.body);
    return res.send(user);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
});

router.delete("/:userId", async (req, res) => {
  try {
    if (!req.context.me) {
      return res.status(401).send("Unauthorized");
    }
    const user = await req.context.models.User.findByPk(req.params.userId);
    if (!user) {
      return res.sendStatus(404);
    }
    if (user.id !== req.context.me.id) {
      return res.status(403).send("Forbidden");
    }
    const result = await user.destroy();
    return res.sendStatus(204);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
});

export default router;