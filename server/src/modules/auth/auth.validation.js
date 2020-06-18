import Joi from '@hapi/joi';

export const login = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export const registerPoljoprivrednik = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  birthPlace: Joi.string().required(),
  birthDate: Joi.string().required(),
});

export const registerPreduzece = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  name: Joi.string().required(),
  location: Joi.string().required(),
  dateOfCreation: Joi.string().required(),
});
