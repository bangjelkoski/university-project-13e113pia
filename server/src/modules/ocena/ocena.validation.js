import Joi from '@hapi/joi';

export const ocene = Joi.object({
  proizvodId: Joi.number().required(),
});
