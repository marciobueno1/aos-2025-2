import { Router } from "express";
import sessionController from "../controllers/sessionController";

const router = Router();

router.get("/", sessionController.getSessionUser);

export default router;