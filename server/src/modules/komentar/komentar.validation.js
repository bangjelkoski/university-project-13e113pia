import Joi from '@hapi/joi';

export const komentari = Joi.object({
  proizvodId: Joi.number().required(),
});
