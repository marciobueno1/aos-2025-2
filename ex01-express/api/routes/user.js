import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  const users = await req.context.models.User.findAll();
  return res.status(200).send(users);
});

router.get("/:userId", async (req, res) => {
  const id = req.params.userId;
  const user = await req.context.models.User.findByPk(id)
  return res.status(200).send(user);
});

router.post("/", async (req, res) => {
  const user = req.body;
  const createdUser = await req.context.models.User.create(user);
  return res.status(201).send(createdUser);
});

router.put("/:userId", async (req, res) => {
  const id = req.params.userId;
  const user = await req.context.models.User.findByPk(id);
  if (!user) {
    return res.status(404).send("User not found");
  }
  await user.update(req.body);
  return res.status(200).send(user);
});

router.delete("/:userId", async (req, res) => {
  const id = req.params.userId;
  const user = await req.context.models.User.findByPk(id);
  if (!user) {
    return res.status(404).send("User not found");
  }
  await user.destroy();
  return res.status(204).send();
});

export default router;
