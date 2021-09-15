const Joi = require('joi');

const schema = Joi.object({
  name: Joi.string().required(),
  ingredients: Joi.string().required(),
  preparation: Joi.string().required(),
}).messages({
  'any.required': 'Invalid entries. Try again.',
});

const validateRecipe = (req, res, next) => {
  const code = 400;

  const { error } = schema.validate(req.body);
  if (error) return res.status(code).json({ message: error.message });

  next();
};

module.exports = {
  validateRecipe,
};
