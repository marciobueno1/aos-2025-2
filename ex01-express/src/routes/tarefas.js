import express from 'express';
import Tarefa from '../models/Tarefa.js';

const router = express.Router();

// GET /api/tarefas — listar todas
router.get('/', async (req, res, next) => {
  try {
    const list = await Tarefa.findAll();
    res.json(list);
  } catch (err) { next(err); }
});

// GET /api/tarefas/:objectId — buscar por id
router.get('/:objectId', async (req, res, next) => {
  try {
    const t = await Tarefa.findByPk(req.params.objectId);
    if (!t) return res.status(404).json({ error: 'Tarefa not found' });
    res.json(t);
  } catch (err) { next(err); }
});

// POST /api/tarefas — criar (201)
router.post('/', async (req, res, next) => {
  try {
    const { descricao, concluida } = req.body;
    if (!descricao || !descricao.trim()) {
      return res.status(400).json({ error: 'descricao_required' });
    }
    const created = await Tarefa.create({ descricao, concluida });
    res.status(201).json(created);
  } catch (err) { next(err); }
});

// PUT /api/tarefas/:objectId — atualizar
router.put('/:objectId', async (req, res, next) => {
  try {
    const t = await Tarefa.findByPk(req.params.objectId);
    if (!t) return res.status(404).json({ error: 'Tarefa not found' });

    const { descricao, concluida } = req.body;
    if (descricao !== undefined) t.descricao = descricao;
    if (concluida !== undefined) t.concluida = concluida;
    await t.save();

    res.json(t);
  } catch (err) { next(err); }
});

// DELETE /api/tarefas/:objectId — deletar (204)
router.delete('/:objectId', async (req, res, next) => {
  try {
    const deleted = await Tarefa.destroy({ where: { objectId: req.params.objectId } });
    if (!deleted) return res.status(404).json({ error: 'Tarefa not found' });
    res.status(204).send();
  } catch (err) { next(err); }
});

export default router;
