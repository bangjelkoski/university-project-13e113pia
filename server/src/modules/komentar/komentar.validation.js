import Joi from '@hapi/joi';

export const komentari = Joi.object({
  proizvodId: Joi.number().required(),
});

export const komentirajParams = Joi.object({
  proizvodId: Joi.number().required(),
});

export const komentiraj = Joi.object({
  komentar: Joi.string().required(),
  korisnikId: Joi.number().required(),
});
