import { Router } from 'express';
import validator from '~/utils/validator';
import * as validation from './magacin.validation';
import * as controller from './magacin.controller';

const router = Router();

router.get(
  '/:poljoprivrednikId/:rasadnikId',
  validator.params(validation.magacin),
  controller.magacin
);

export default router;
