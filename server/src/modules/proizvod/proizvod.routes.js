import { Router } from 'express';
import validator from '~/utils/validator';
import * as validation from './proizvod.validation';
import * as controller from './proizvod.controller';

const router = Router();

router.get(
  '/:preduzeceId',
  validator.params(validation.proizvodi),
  controller.proizvodi
);
router.post(
  '/:preduzeceId',
  validator.params(validation.kreirajParams),
  validator.body(validation.kreiraj),
  controller.kreiraj
);

router.get(
  '/:preduzeceId/:id',
  validator.params(validation.proizvod),
  controller.proizvod
);
router.delete(
  '/:preduzeceId/:id',
  validator.params(validation.obrisi),
  controller.obrisi
);

export default router;
