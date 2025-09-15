import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const user = await req.context.models.User.findByPk(
      req.context.me.id
    );
    return res.send(user);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
});

export default router;