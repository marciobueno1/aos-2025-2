const messageController = {
  getAllMessages: async (req, res) => {
    const messages = await req.context.models.Message.findAll();
    return res.send(messages);
  },

  getMessageById: async (req, res) => {
    const message = await req.context.models.Message.findByPk(
      req.params.messageId
    );
    if (!message) {
      return res.sendStatus(404);
    }
    return res.send(message);
  },

  createMessage: async (req, res) => {
    const message = await req.context.models.Message.create({
      text: req.body.text,
      userId: req.context.me.id,
    });

    return res.status(201).send(message);
  },

  updateMessage: async (req, res) => {
    const message = req.resource; // Resource attached by isResourceOwner middleware
    await message.update(req.body);
    return res.send(message);
  },

  deleteMessage: async (req, res) => {
    const message = req.resource; // Resource attached by isResourceOwner middleware
    await message.destroy();
    return res.sendStatus(204);
  },
};

export default messageController;