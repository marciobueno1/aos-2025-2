import { Router } from "express";
import authController from "../controllers/authController";
import { isAuthenticated } from "../middleware/authMiddleware";

const router = Router();

router.post("/signIn", authController.signIn);

router.get("/me", isAuthenticated, authController.getMe);

export default router;
