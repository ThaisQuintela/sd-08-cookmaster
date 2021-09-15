const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => {
  return connection()
    .then((db) => db.collection('users').find().toArray())
    .then((userList) => userList.map(({ _id, name, email, role }) =>
      ({ user: { _id, name, email, role } })));
};

const newUser = async (name, email, password) => {
  return connection()
    .then((db) => db.collection('users')
      .insertOne({ name, email, password, role: 'user' }))
    .then((user) => ({ user: { '_id': user.insertedId, name, email, role: 'user' } }));
};

const findById = async (id) => {
  return connection()
    .then((db) => db.collection('users').findOne(new ObjectId(id)))
    .then((item) => (item));
};

const login = async (email, password) => {
  return connection()
    .then((db) => db.collection('users').findOne({ email, password }))
    .then((user) => (user));
};

module.exports = {
  getAll,
  newUser,
  findById,
  login,
};
