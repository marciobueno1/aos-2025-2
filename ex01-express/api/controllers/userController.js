import catchAsync from "../utils/catchAsync";
import userService from "../services/userService";

const userController = {
  getAllUsers: catchAsync(async (req, res, next) => {
    console.debug("DEBUG: Entering userController.getAllUsers");
    const users = await userService.getAll(req.context.models);
    console.debug("DEBUG: users retrieved from userService", users);
    console.debug("DEBUG: Exiting userController.getAllUsers");
    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        users,
      },
    });
  }),

  getUserById: catchAsync(async (req, res, next) => {
    console.debug("DEBUG: Entering userController.getUserById");
    const user = await userService.getById(
      req.context.models,
      req.params.userId
    );
    console.debug("DEBUG: user retrieved from userService", user);
    console.debug("DEBUG: Exiting userController.getUserById");
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  }),

  createUser: catchAsync(async (req, res, next) => {
    const user = await userService.create(req.context.models, req.body);
    res.status(201).json({
      status: "success",
      data: {
        user,
      },
    });
  }),

  updateUser: catchAsync(async (req, res, next) => {
    const user = await userService.update(
      req.context.models,
      req.params.userId,
      req.body
    );
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  }),

  deleteUser: catchAsync(async (req, res, next) => {
    await userService.delete(req.context.models, req.params.userId);
    res.status(204).json({
      status: "success",
      data: null,
    });
  }),
};

export default userController;
