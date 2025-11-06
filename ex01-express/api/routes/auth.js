import { Router } from "express";
import rateLimit from "express-rate-limit";
import authController from "../controllers/authController";
import { isAuthenticated } from "../middleware/authMiddleware";

const router = Router();

const signInLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // limit each IP to 10 requests per windowMs
  message: "Too many sign-in attempts, please try again after a minute",
});

if (process.env.DEBUG !== "true") {
  router.post("/signIn", signInLimiter, authController.signIn);
} else {
  router.post("/signIn", authController.signIn);
}

router.get("/me", isAuthenticated, authController.getMe);

router.post("/signOut", isAuthenticated, authController.signOut);

export default router;
