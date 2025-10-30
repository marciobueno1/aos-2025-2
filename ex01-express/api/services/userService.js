import genericService from "./genericService";
import AppError from "../utils/AppError";

const userService = genericService('User');

userService.getAll = async (models) => {
  console.debug("DEBUG: Entering userService.getAll");
  const users = await models.User.findAll({
    attributes: { exclude: ["password"] },
  });
  console.debug("DEBUG: users retrieved from database", users);
  console.debug("DEBUG: Exiting userService.getAll");
  return users;
};

userService.getById = async (models, id) => {
  console.debug("DEBUG: Entering userService.getById");
  const user = await models.User.findByPk(id, {
    attributes: { exclude: ["password"] },
  });
  console.debug("DEBUG: user retrieved from database", user);
  if (!user) {
    throw new AppError(`No user found with that ID`, 404);
  }
  console.debug("DEBUG: Exiting userService.getById");
  return user;
};

const originalCreate = userService.create;
userService.create = async (models, data) => {
  const user = await originalCreate(models, data);
  const { password, ...userWithoutPassword } = user.get({ plain: true });
  return userWithoutPassword;
};

const originalUpdate = userService.update;
userService.update = async (models, id, data) => {
  const user = await originalUpdate(models, id, data);
  const { password, ...userWithoutPassword } = user.get({ plain: true });
  return userWithoutPassword;
};

export default userService;
