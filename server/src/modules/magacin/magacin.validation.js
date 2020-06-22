import Joi from '@hapi/joi';

export const magacin = Joi.object({
  rasadnikId: Joi.number().required(),
  poljoprivrednikId: Joi.number().required(),
});
