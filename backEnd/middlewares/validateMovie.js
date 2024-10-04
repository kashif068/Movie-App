// middlewares/validateRequest.js
const Joi = require('joi');         // used to validate data in React applications

const validateMovie = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().min(3).required(),
    releaseYear: Joi.number().min(1).required(),
    // img:Joi.string(),
    user: Joi.string(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

module.exports = validateMovie;
