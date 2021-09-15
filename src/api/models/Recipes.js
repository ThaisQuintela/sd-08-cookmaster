const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => {
  return connection()
    .then((db) => db.collection('recipes').find().toArray())
    .then((userList) => userList.map((item) => (item)));
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return connection()
    .then((db) => db.collection('recipes').findOne(new ObjectId(id)))
    .then((item) => (item));
};

const newRecipe = async (name, ingredients, preparation, userId) => {
  return connection()
    .then((db) => db.collection('recipes')
      .insertOne({ name, ingredients, preparation, userId }))
    .then((item) => ({
      recipe: {
        _id: item.insertedId,
        name,
        ingredients,
        preparation,
        userId,
      }
    }));
};

const updateRecipe = async (id, info, userId) => {
  if (!ObjectId.isValid(id)) return null;

  const { name, ingredients, preparation } = info;

  return connection()
    .then((db) => db.collection('recipes')
      .updateOne(
        { id: ObjectId(id) },
        { $set: { name, ingredients, preparation } }
      ))
    .then(() => ({ _id: id, name, ingredients, preparation, userId }));
};

const deleteRecipe = async (id) => {
  return connection()
    .then((db) => db.collection('recipes').deleteOne({ _id: ObjectId(id) }));
};

const uploadImage = async (id, image) => {
  if (!ObjectId.isValid(id)) return null;

  return connection()
    .then((db) => db.collection('recipes')
      .updateOne(
        { _id: ObjectId(id) },
        { $set: { image } }
      ));
};

module.exports = {
  getAll,
  findById,
  newRecipe,
  updateRecipe,
  deleteRecipe,
  uploadImage,
};
