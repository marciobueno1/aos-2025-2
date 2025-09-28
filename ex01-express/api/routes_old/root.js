import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  return res.send("Received a GET HTTP method");
});

router.post("/", (req, res) => {
  return res.send("Received a POST HTTP method");
});

router.put("/", (req, res) => {
  return res.send("Received a PUT HTTP method");
});

router.delete("/", (req, res) => {
  return res.send("Received a DELETE HTTP method");
});

export default router;
