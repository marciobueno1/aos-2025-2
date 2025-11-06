import catchAsync from "../utils/catchAsync";
import authService from "../services/authService";
import AppError from "../utils/AppError";

const authController = {
  signIn: catchAsync(async (req, res, next) => {
    console.debug("DEBUG: Entering authController.signIn");
    const { login, password } = req.body;

    if (!login || !password) {
      console.debug("DEBUG: Missing login or password");
      return next(new AppError("Please provide both login and password", 400));
    }

    const token = await authService.signIn(
      req.context.models.User,
      login,
      password
    );
    console.debug("DEBUG: token retrieved from authService");
    console.debug("DEBUG: Exiting authController.signIn");
    res.status(200).json({
      status: "success",
      token,
    });
  }),

  getMe: catchAsync(async (req, res, next) => {
    if (!req.context.me) {
      return next(new AppError("You are not logged in!", 401));
    }
    const user = await req.context.models.User.findByPk(req.context.me.id, {
      attributes: { exclude: ["password"] },
    });
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  }),

  signOut: catchAsync(async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    await authService.signOut(req.context.models.BlacklistedToken, token);
    res
      .status(200)
      .json({ status: "success", message: "Signed out successfully" });
  }),
};

export default authController;
