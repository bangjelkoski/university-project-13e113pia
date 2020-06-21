import Joi from '@hapi/joi';

export const azurirajParams = Joi.object({
  id: Joi.number().required(),
});

export const proizvod = Joi.object({
  id: Joi.number().required(),
});

export const proizvodi = Joi.object({
  preduzeceId: Joi.number().required(),
});

export const azuriraj = Joi.object({
  name: Joi.string().required(),
});

export const obrisi = Joi.object({
  id: Joi.number().required(),
});
