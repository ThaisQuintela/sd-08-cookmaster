const jwt = require('jsonwebtoken');
const Users = require('../models/Users');
const { code } = require('../utils/errorCode');

const secret = 'something'; 

module.exports = async (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(code.unauthorized).json({ message: 'missing auth token' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    const user = await Users.findById(decoded._id);

    req.user = user;

    next();
  } catch (err) {
    return res.status(code.unauthorized).json({ message: err.message });
  }
};