import Joi from '@hapi/joi';

export const kuriri = Joi.object({
  preduzeceId: Joi.number().required(),
});

export const dodeli = Joi.object({
  id: Joi.number().required(),
  narudzbinaId: Joi.number().required(),
  zauzetDo: Joi.required(),
});
