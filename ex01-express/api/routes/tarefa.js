import { Router } from "express";
import tarefaController from "../controllers/tarefaController";

const router = Router();

router.get("/", tarefaController.getAllTarefas);

router.get("/:tarefaId", tarefaController.getTarefaById);

router.post("/", tarefaController.createTarefa);

router.put("/:tarefaId", tarefaController.updateTarefa);

router.delete("/:tarefaId", tarefaController.deleteTarefa);

export default router;
