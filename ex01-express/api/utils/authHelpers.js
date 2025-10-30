import jwt from 'jsonwebtoken';

export const createToken = async (user, secret, expiresIn) => {
  const { id, email, username } = user;
  return await jwt.sign({ id, email, username }, secret, {
    expiresIn,
  });
};

export const decodeToken = (token) => {
  return jwt.decode(token);
};
