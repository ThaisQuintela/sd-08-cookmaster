const Recipes = require('../models/Recipes');

const getAll = async () => Recipes.getAll();

const findById = async (id) => {
  const recipe = await Recipes.findById(id);
  if (!recipe) return { message: 'recipe not found' };

  return recipe;
};

const newRecipe = async (name, ingredients, preparation, userId) => {
  const addNewRecipe = await Recipes.newRecipe(name, ingredients, preparation, userId);
  return addNewRecipe;
};

const updateRecipe = async (id, info, userId) => {
  const update = await Recipes.updateRecipe(id, info, userId);
  return update;
};

const deleteRecipe = async (id, user) => {
  const { role } = user;
  const userId = user.id;

  const recipe = await Recipes.findById(id);

  if (recipe.userId === userId || role === 'admin') {
    await Recipes.deleteRecipe(id);
  }
};

const uploadImage = async (id, image) => {
  const upload = await Recipes.uploadImage(id, image);
  return upload;
};

module.exports = {
  getAll,
  findById,
  newRecipe,
  updateRecipe,
  deleteRecipe,
  uploadImage,
};
