import { Router } from 'express';
import validator from '~/utils/validator';
import * as validation from './sadnik.validation';
import * as controller from './sadnik.controller';

const router = Router();

router.post(
  '/:id/izvadi',
  validator.params(validation.izvadi),
  controller.izvadi
);

router.post(
  '/:rasadnikId/dodaj/:id',
  validator.params(validation.dodaj),
  controller.dodaj
);

router.post(
  '/:sadnikId/preparat/:preparatId',
  validator.params(validation.preparat),
  controller.preparat
);

export default router;
