import Joi from '@hapi/joi';

export const odbij = Joi.object({
  id: Joi.number().required(),
  preduzeceId: Joi.number().required(),
});

export const odobri = Joi.object({
  id: Joi.number().required(),
  preduzeceId: Joi.number().required(),
});

export const narudzbina = Joi.object({
  id: Joi.number().required(),
  preduzeceId: Joi.number().required(),
});

export const narudzbine = Joi.object({
  preduzeceId: Joi.number().required(),
});
