import models from '../models';

const createUsersWithMessages = async () => {
  try {
    await models.User.create(
      {
        username: 'rwieruch',
        email: 'rwieruch@email.com',
        password: 'Rwieruch123!',
        messages: [
          {
            text: 'Published the Road to learn React',
          },
          {
            text: 'Published also the Road to learn Express + PostgreSQL',
          },
        ],
      },
      {
        include: [models.Message],
      },
    );

    await models.User.create(
      {
        username: 'ddavids',
        email: 'ddavids@email.com',
        password: 'Ddavids123!',
        messages: [
          {
            text: 'Happy to release ...',
          },
          {
            text: 'Published a complete ...',
          },
        ],
      },
      {
        include: [models.Message],
      },
    );
  } catch (error) {
    console.error(error);
  }
};

export { createUsersWithMessages };
