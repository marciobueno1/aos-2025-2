import AppError from '../utils/AppError';

const genericService = (modelName) => ({
  getAll: async (models) => {
    const model = models[modelName];
    console.log(`Fetching all items for model: ${model.name}`);
    try {
      const items = await model.findAll();
      console.log(`Found ${items.length} items for model: ${model.name}`);
      return items;
    } catch (error) {
      console.error(`Error fetching items for model: ${model.name}`, error);
      throw new AppError(`Error fetching ${model.name.toLowerCase()}s`, 500);
    }
  },

  getById: async (models, id) => {
    const model = models[modelName];
    const item = await model.findByPk(id);
    if (!item) {
      throw new AppError(`No ${model.name.toLowerCase()} found with that ID`, 404);
    }
    return item;
  },

  create: async (models, data) => {
    const model = models[modelName];
    const item = await model.create(data);
    return item;
  },

  update: async (models, id, data) => {
    const model = models[modelName];
    const item = await model.findByPk(id);
    if (!item) {
      throw new AppError(`No ${model.name.toLowerCase()} found with that ID`, 404);
    }
    await item.update(data);
    return item;
  },

  delete: async (models, id) => {
    const model = models[modelName];
    const item = await model.findByPk(id);
    if (!item) {
      throw new AppError(`No ${model.name.toLowerCase()} found with that ID`, 404);
    }
    await item.destroy();
  },
});

export default genericService;
