import jwt from "jsonwebtoken";

const createToken = async (user, secret, expiresIn) => {
  const { id, email, username } = user;
  return await jwt.sign({ id, email, username }, secret, {
    expiresIn,
  });
};

const authController = {
  signIn: async (req, res) => {
    const { login, password } = req.body;
    const user = await req.context.models.User.findByLogin(login);

    if (!user) {
      return res.status(401).send("Unauthorized");
    }

    const isValid = await user.validatePassword(password);

    if (!isValid) {
      return res.status(401).send("Unauthorized");
    }

    const token = await createToken(user, process.env.JWT_SECRET, "30m");

    return res.send({ token });
  },

  getMe: async (req, res) => {
    if (!req.context.me) {
      return res.status(401).send("Unauthorized");
    }
    const { password, ...user } = await req.context.models.User.findByPk(
      req.context.me.id
    );
    return res.send(user);
  },
};

export default authController;
