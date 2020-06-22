import { Router } from 'express';
import validator from '~/utils/validator';
import * as validation from './rasadnik.validation';
import * as controller from './rasadnik.controller';

const router = Router();

router.post(
  '/:id/temperature',
  validator.params(validation.setTemperatureParams),
  validator.body(validation.setTemperature),
  controller.setTemperature
);

router.post(
  '/:id/water-level',
  validator.params(validation.setWaterLevelParams),
  validator.body(validation.setWaterLevel),
  controller.setWaterLevel
);

router.get(
  '/:poljoprivrednikId',
  validator.params(validation.rasadnici),
  controller.rasadnici
);
router.post(
  '/:poljoprivrednikId',
  validator.params(validation.kreirajParams),
  validator.body(validation.kreiraj),
  controller.kreiraj
);

router.get(
  '/:poljoprivrednikId/:id',
  validator.params(validation.rasadnik),
  controller.rasadnik
);

export default router;
