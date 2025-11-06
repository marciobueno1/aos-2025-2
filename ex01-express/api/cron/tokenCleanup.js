import { Op } from 'sequelize';
import models from '../models';

const cleanupExpiredTokens = async () => {
  try {
    await models.BlacklistedToken.destroy({
      where: {
        expiresAt: {
          [Op.lt]: new Date(),
        },
      },
    });
  } catch (error) {
    console.error('Error cleaning up expired tokens:', error);
  }
};

const scheduleTokenCleanup = () => {
  setInterval(cleanupExpiredTokens, 24 * 60 * 60 * 1000); // 24 hours
};

export { scheduleTokenCleanup };
