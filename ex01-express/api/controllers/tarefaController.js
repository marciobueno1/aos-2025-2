const tarefaController = {
  getAllTarefas: async (req, res) => {
    const tarefas = await req.context.models.Tarefa.findAll();
    return res.send({ results: tarefas });
  },

  getTarefaById: async (req, res) => {
    const tarefa = await req.context.models.Tarefa.findByPk(
      req.params.tarefaId
    );
    if (!tarefa) {
      return res.sendStatus(404);
    }
    return res.send(tarefa);
  },

  createTarefa: async (req, res) => {
    const { descricao, concluida } = req.body;
    try {
      const tarefa = await req.context.models.Tarefa.create({
        descricao,
        concluida,
      });
      return res.status(201).send(tarefa);
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
  },

  updateTarefa: async (req, res) => {
    const tarefa = await req.context.models.Tarefa.findByPk(
      req.params.tarefaId
    );
    if (!tarefa) {
      return res.sendStatus(404);
    }
    try {
      await tarefa.update(req.body);
      return res.send(tarefa);
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
  },

  deleteTarefa: async (req, res) => {
    const tarefa = await req.context.models.Tarefa.findByPk(
      req.params.tarefaId
    );
    if (!tarefa) {
      return res.sendStatus(404);
    }
    await tarefa.destroy();
    return res.sendStatus(204);
  },
};

export default tarefaController;
