const sessionController = {
  getSessionUser: async (req, res) => {
    const user = await req.context.models.User.findByPk(
      req.context.me.id
    );
    return res.send(user);
  },
};

export default sessionController;