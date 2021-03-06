import { Router } from 'express';
import validator from '~/utils/validator';
import * as validation from './komentar.validation';
import * as controller from './komentar.controller';

const router = Router();

router.get(
  '/:proizvodId',
  validator.params(validation.komentari),
  controller.komentari
);

router.post(
  '/:proizvodId',
  validator.params(validation.komentirajParams),
  validator.body(validation.komentiraj),
  controller.komentiraj
);

export default router;
