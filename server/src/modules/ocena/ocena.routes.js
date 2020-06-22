import { Router } from 'express';
import validator from '~/utils/validator';
import * as validation from './ocena.validation';
import * as controller from './ocena.controller';

const router = Router();

router.get(
  '/:proizvodId',
  validator.params(validation.ocene),
  controller.ocene
);

router.post(
  '/:proizvodId',
  validator.params(validation.oceniParams),
  validator.body(validation.oceni),
  controller.oceni
);

export default router;
