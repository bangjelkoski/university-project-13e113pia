import { Router } from 'express';
import validator from '~/utils/validator';
import * as validation from './auth.validation';
import * as controller from './auth.controller';

const router = Router();

router.post('/login', validator.body(validation.login), controller.login);
router.post(
  '/register/poljoprivrednik',
  validator.body(validation.registerPoljoprivrednik),
  controller.registerPoljoprivrednik
);
router.post(
  '/register/preduzece',
  validator.body(validation.registerPreduzece),
  controller.registerPreduzece
);

export default router;
