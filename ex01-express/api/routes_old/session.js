import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  return res.send(req.context.me);
});

export default router;
