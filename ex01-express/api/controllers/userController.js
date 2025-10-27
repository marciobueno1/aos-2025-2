const userController = {
  getAllUsers: async (req, res) => {
    const users = await req.context.models.User.findAll({
      attributes: { exclude: ["password"] },
    });
    return res.send(users);
  },

  getUserById: async (req, res) => {
    const user = await req.context.models.User.findByPk(req.params.userId, {
      attributes: { exclude: ["password"] },
    });
    if (!user) {
      return res.sendStatus(404);
    }
    return res.send(user);
  },

  createUser: async (req, res) => {
    const user = await req.context.models.User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    return res.status(201).send(user);
  },

  updateUser: async (req, res) => {
    const user = req.resource; // Resource attached by isResourceOwner middleware
    await user.update(req.body);
    return res.send(user);
  },

  deleteUser: async (req, res) => {
    const user = req.resource; // Resource attached by isResourceOwner middleware
    await user.destroy();
    return res.sendStatus(204);
  },
};

export default userController;
