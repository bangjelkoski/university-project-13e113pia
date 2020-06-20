import Joi from '@hapi/joi';

export const odbij = Joi.object({
  id: Joi.string().required(),
});

export const azuriraj = Joi.object({
  id: Joi.string().required(),
});

export const obrisi = Joi.object({
  id: Joi.string().required(),
});

export const korisnik = Joi.object({
  id: Joi.string().required(),
});

export const odobri = Joi.object({
  id: Joi.string().required(),
});
