import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const messages = await req.context.models.Message.findAll();
    return res.send(messages);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
});

router.get("/:messageId", async (req, res) => {
  try {
    const message = await req.context.models.Message.findByPk(
      req.params.messageId
    );
    if (!message) {
      return res.sendStatus(404);
    }
    return res.send(message);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
});

router.post("/", async (req, res) => {
  try {
    if (!req.context.me) {
      return res.status(401).send("Unauthorized");
    }
    const message = await req.context.models.Message.create({
      text: req.body.text,
      userId: req.context.me.id,
    });

    return res.status(201).send(message);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
});

router.put("/:messageId", async (req, res) => {
  try {
    if (!req.context.me) {
      return res.status(401).send("Unauthorized");
    }
    const message = await req.context.models.Message.findByPk(
      req.params.messageId
    );
    if (!message) {
      return res.sendStatus(404);
    }
    if (message.userId !== req.context.me.id) {
      return res.status(403).send("Forbidden");
    }
    await message.update(req.body);
    return res.send(message);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
});

router.delete("/:messageId", async (req, res) => {
  try {
    if (!req.context.me) {
      return res.status(401).send("Unauthorized");
    }
    const message = await req.context.models.Message.findByPk(
      req.params.messageId
    );
    if (!message) {
      return res.sendStatus(404);
    }
    if (message.userId !== req.context.me.id) {
      return res.status(403).send("Forbidden");
    }
    await message.destroy();
    return res.sendStatus(204);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
});

export default router;