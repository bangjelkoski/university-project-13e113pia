import Joi from '@hapi/joi';

export const ocene = Joi.object({
  proizvodId: Joi.number().required(),
});

export const oceniParams = Joi.object({
  proizvodId: Joi.number().required(),
});

export const oceni = Joi.object({
  ocena: Joi.number().required(),
  korisnikId: Joi.number().required(),
});
