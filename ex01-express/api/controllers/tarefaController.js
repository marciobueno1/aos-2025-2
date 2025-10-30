import catchAsync from '../utils/catchAsync';
import tarefaService from '../services/tarefaService';

const tarefaController = {
  getAllTarefas: catchAsync(async (req, res, next) => {
    const tarefas = await tarefaService.getAll();
    res.status(200).json({
      status: 'success',
      results: tarefas.length,
      data: {
        tarefas,
      },
    });
  }),

  getTarefaById: catchAsync(async (req, res, next) => {
    const tarefa = await tarefaService.getById(req.params.tarefaId);
    res.status(200).json({
      status: 'success',
      data: {
        tarefa,
      },
    });
  }),

  createTarefa: catchAsync(async (req, res, next) => {
    const tarefa = await tarefaService.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tarefa,
      },
    });
  }),

  updateTarefa: catchAsync(async (req, res, next) => {
    const updatedTarefa = await tarefaService.update(
      req.params.tarefaId,
      req.body
    );
    res.status(200).json({
      status: 'success',
      data: {
        tarefa: updatedTarefa,
      },
    });
  }),

  deleteTarefa: catchAsync(async (req, res, next) => {
    await tarefaService.delete(req.params.tarefaId);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  }),
};

export default tarefaController;


