import { Router } from 'express';
import validator from '~/utils/validator';
import * as validation from './preduzece.validation';
import * as controller from './preduzece.controller';

const router = Router();

router.get('', controller.preduzeca);

export default router;
