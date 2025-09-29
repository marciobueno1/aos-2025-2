import { Router } from "express";
import userController from "../controllers/userController";
import { isAuthenticated, isResourceOwner } from "../middleware/authMiddleware";

const router = Router();

router.get("/", userController.getAllUsers);

router.get("/:userId", userController.getUserById);

router.post("/", userController.createUser);

router.put(
  "/:userId",
  isAuthenticated,
  isResourceOwner('User'),
  userController.updateUser
);

router.delete(
  "/:userId",
  isAuthenticated,
  isResourceOwner('User'),
  userController.deleteUser
);

export default router;