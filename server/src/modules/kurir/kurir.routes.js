import { Router } from 'express';
import validator from '~/utils/validator';
import * as validation from './kurir.validation';
import * as controller from './kurir.controller';

const router = Router();

router.post('/dodeli', validator.body(validation.dodeli), controller.dodeli);

router.get(
  '/:preduzeceId',
  validator.params(validation.kuriri),
  controller.kuriri
);

export default router;
