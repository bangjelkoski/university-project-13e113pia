import Joi from '@hapi/joi';

export const azurirajParams = Joi.object({
  id: Joi.number().required(),
  preduzeceId: Joi.number().required(),
});

export const proizvod = Joi.object({
  id: Joi.number().required(),
  preduzeceId: Joi.number().required(),
});

export const kreirajParams = Joi.object({
  preduzeceId: Joi.number().required(),
});

export const kreiraj = Joi.object({
  name: Joi.string().required(),
  manufacturer: Joi.string().required(),
  description: Joi.string().required(),
  image: Joi.string().required(),
  price: Joi.number().required(),
  type: Joi.string().required(),
  quantity: Joi.number().required(),
  value: Joi.number().required(),
});

export const proizvodi = Joi.object({
  preduzeceId: Joi.number().required(),
});

export const azuriraj = Joi.object({
  name: Joi.string().required(),
});

export const obrisi = Joi.object({
  id: Joi.number().required(),
  preduzeceId: Joi.number().required(),
});
