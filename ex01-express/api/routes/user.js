import { Router } from "express";
import userController from "../controllers/userController";
import { isAuthenticated, isResourceOwner } from "../middleware/authMiddleware";

const router = Router();

console.debug("API routes/user.js");

router.get(
  "/",
  (req, res, next) => {
    console.debug("Request to get all users received");
    next();
  },
  userController.getAllUsers
);

router.get("/:userId", userController.getUserById);

router.post("/", userController.createUser);

router.put(
  "/:userId",
  isAuthenticated,
  isResourceOwner("User"),
  userController.updateUser
);

router.delete(
  "/:userId",
  isAuthenticated,
  isResourceOwner("User"),
  userController.deleteUser
);

export default router;
