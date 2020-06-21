import { Router } from 'express';
import validator from '~/utils/validator';
import * as validation from './narudzbina.validation';
import * as controller from './narudzbina.controller';

const router = Router();

router.get(
  '/:preduzeceId',
  validator.params(validation.narudzbine),
  controller.narudzbine
);

router.post(
  '/:preduzeceId/:id/odbij',
  validator.params(validation.odbij),
  controller.odbij
);
router.post(
  '/:preduzeceId/:id/odobri',
  validator.params(validation.odobri),
  controller.odobri
);

router.get(
  '/:preduzeceId/:id',
  validator.params(validation.narudzbina),
  controller.narudzbina
);

export default router;
