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

router.get(
  '/:preduzeceId/:id',
  validator.params(validation.proizvod),
  controller.proizvod
);
router.post(
  '/:preduzeceId/:id',
  validator.params(validation.azurirajParams),
  validator.body(validation.azuriraj),
  controller.azuriraj
);
router.delete(
  '/:preduzeceId/:id',
  validator.params(validation.obrisi),
  controller.obrisi
);

export default router;
