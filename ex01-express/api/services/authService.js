import AppError from '../utils/AppError';
import { createToken, decodeToken } from '../utils/authHelpers';

const authService = {
  signIn: async (User, login, password) => {
    if (!login || !password) {
      throw new AppError('Please provide email and password!', 400);
    }

    const user = await User.findByLogin(login);

    if (!user || !(await user.validatePassword(password))) {
      throw new AppError('Incorrect email or password', 401);
    }

    const token = await createToken(user, process.env.JWT_SECRET, '30m');

    return token;
  },

  signOut: async (BlacklistedToken, token) => {
    if (!token) {
      throw new AppError('Token not provided', 400);
    }

    const { exp } = decodeToken(token);
    const expiresAt = new Date(exp * 1000);

    await BlacklistedToken.create({
      token,
      expiresAt,
    });
  },
};

export default authService;
