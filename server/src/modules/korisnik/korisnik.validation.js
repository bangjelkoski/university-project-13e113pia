import Joi from '@hapi/joi';

export const odbij = Joi.object({
  id: Joi.number().required(),
});

export const azurirajParams = Joi.object({
  id: Joi.number().required(),
});

export const narucioProizvod = Joi.object({
  id: Joi.number().required(),
  proizvodId: Joi.number().required(),
});

export const azuriraj = Joi.object({
  username: Joi.string().required(),
  password: Joi.optional(),
  phone: Joi.string().required(),
  email: Joi.string().required(),
});

export const obrisi = Joi.object({
  id: Joi.number().required(),
});

export const korisnik = Joi.object({
  id: Joi.number().required(),
});

export const odobri = Joi.object({
  id: Joi.number().required(),
});
