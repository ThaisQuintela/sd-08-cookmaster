const Recipes = require('../services/Recipes');
const { code } = require('../utils/errorCode');

const getAll = async (_req, res) => {
  const recipeList = await Recipes.getAll();
  res.status(code.OK).json(recipeList);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const findRecipe = await Recipes.findById(id);
  if (findRecipe.message) return res.status(code.not_found).json(findRecipe);
  res.status(code.OK).json(findRecipe);
};

const newRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const userId = req.user._id;

  const addNewRecipe = await Recipes.newRecipe(name, ingredients, preparation, userId);
  res.status(code.created).json(addNewRecipe);
};

const updateRecipe = async (req, res) => {
  const { id } = req.params;
  const info = req.body;
  const userId = req.user._id;
  
  const updatedRecipe = await Recipes.updateRecipe(id, info, userId);

  res.status(code.OK).json(updatedRecipe);
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  await Recipes.deleteRecipe(id, user);
  res.status(code.no_content).json();
};

const uploadImage = async (req, res) => {
  const { id } = req.params;
  const { path } = req.file;
  const { host } = req.headers;

  const image = `${host}/${path}`;
  await Recipes.uploadImage(id, image);

  const recipe = await Recipes.findById(id);
  res.status(code.OK).json(recipe);
};

module.exports = {
  getAll,
  findById,
  newRecipe,
  updateRecipe,
  deleteRecipe,
  uploadImage,
};
