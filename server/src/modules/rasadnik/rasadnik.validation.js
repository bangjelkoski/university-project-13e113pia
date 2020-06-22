import Joi from '@hapi/joi';

export const rasadnik = Joi.object({
  id: Joi.number().required(),
  poljoprivrednikId: Joi.number().required(),
});

export const kreirajParams = Joi.object({
  poljoprivrednikId: Joi.number().required(),
});

export const kreiraj = Joi.object({
  name: Joi.string().required(),
  location: Joi.string().required(),
  width: Joi.number().required(),
  length: Joi.number().required(),
});

export const setTemperatureParams = Joi.object({
  id: Joi.number().required(),
});

export const setTemperature = Joi.object({
  temperature: Joi.number().required(),
});

export const setWaterLevelParams = Joi.object({
  id: Joi.number().required(),
});

export const setWaterLevel = Joi.object({
  waterLevel: Joi.number().required(),
});

export const rasadnici = Joi.object({
  poljoprivrednikId: Joi.number().required(),
});
