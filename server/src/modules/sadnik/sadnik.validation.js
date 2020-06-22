import Joi from '@hapi/joi';

export const preparat = Joi.object({
  sadnikId: Joi.number().required(),
  preparatId: Joi.number().required(),
});

export const izvadi = Joi.object({
  id: Joi.number().required(),
});

export const dodaj = Joi.object({
  id: Joi.number().required(),
  rasadnikId: Joi.number().required(),
});
