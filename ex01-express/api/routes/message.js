import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  const messages = await req.context.models.Message.findAll();
  return res.status(200).send(messages);
});

router.get("/:messageId", async (req, res) => {
  const id = req.params.messageId;
  const message = await req.context.models.Message.findByPk(id);
  return res.status(200).send(message);
});

router.post("/", async (req, res) => {
  const message = {
    text: req.body.text,
    userId: req.context.me.id,
  };
  const createdMessage = await req.context.models.Message.create(message);
  return res.status(201).send(createdMessage);
});

router.put("/:messageId", async (req, res) => {
  const id = req.params.messageId;
  const message = await req.context.models.Message.findByPk(id);
  if (!message) {
    return res.status(404).send("Message not found");
  }
  await message.update(req.body);
  return res.status(200).send(message);
});

router.delete("/:messageId", async (req, res) => {
  const id = req.params.messageId;
  const message = await req.context.models.Message.findByPk(id);
  if (!message) {
    return res.status(404).send("Message not found");
  }
  await message.destroy();
  return res.status(204).send();
});

export default router;
