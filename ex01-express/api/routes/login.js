import { Router } from "express";
import jwt from "jsonwebtoken";
import 'dotenv/config';

const router = Router();
const SECRET_KEY = process.env.JWT_SECRET;

router.post("/", async (req, res) => {
  try {
    const { login, password } = req.body;

    if (!login || !password) {
      return res
        .status(400)
        .json({ error: "Usuário/e-mail e senha são obrigatórios" });
    }

    const user = await req.context.models.User.findByLogin(login);

    if (!user) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    const isValidPassword = await user.validatePassword(password);

    if (!isValidPassword) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: "1h" });

    return res.json({ token });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default router;