import { Router } from "express";
import messageController from "../controllers/messageController";
import { isAuthenticated, isResourceOwner } from "../middleware/authMiddleware";

const router = Router();

router.get("/", messageController.getAllMessages);

router.get("/:messageId", messageController.getMessageById);

router.post(
  "/",
  isAuthenticated,
  messageController.createMessage
);

router.put(
  "/:messageId",
  isAuthenticated,
  isResourceOwner('Message'),
  messageController.updateMessage
);

router.delete(
  "/:messageId",
  isAuthenticated,
  isResourceOwner('Message'),
  messageController.deleteMessage
);

export default router;