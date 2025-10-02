import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  const tarefas = await req.context.models.Tarefa.findAll();
  return res.status(200).send(tarefas);
});

router.get("/:tarefaId", async (req, res) => {
  const id = req.params.tarefaId;
  const tarefa = await req.context.models.Tarefa.findByPk(id);
  if (!tarefa) {
    return res.status(404).send("Tarefa não encontrada");
  }
  return res.status(200).send(tarefa);
});

router.post("/", async (req, res) => {
  const tarefa = {
    descricao: req.body.descricao,
    userId: req.context.me.id,
  };
  try {
    const createdTarefa = await req.context.models.Tarefa.create(tarefa);
    return res.status(201).send(createdTarefa);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});

router.put("/:tarefaId", async (req, res) => {
  const id = req.params.tarefaId;
  const tarefa = await req.context.models.Tarefa.findByPk(id);
  if (!tarefa) {
    return res.status(404).send("Tarefa não encontrada");
  }
  await tarefa.update(req.body);
  return res.status(200).send(tarefa);
});

router.delete("/:tarefaId", async (req, res) => {
  const id = req.params.tarefaId;
  const tarefa = await req.context.models.Tarefa.findByPk(id);
  if (!tarefa) {
    return res.status(404).send("Tarefa não encontrada");
  }
  await tarefa.destroy();
  return res.status(204).send();
});

export default router;