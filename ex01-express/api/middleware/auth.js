import jwt from "jsonwebtoken";
import 'dotenv/config';

const SECRET_KEY = process.env.JWT_SECRET;

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  const parts = authHeader.split(" ");

  if (!parts.length === 2) {
    return res.status(401).json({ error: "Erro no token" });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ error: "Token mal formatado" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.userId = decoded.id;
    return next();
  } catch (error) {
    return res.status(401).json({ error: "Token inválido" });
  }
};

export default auth;