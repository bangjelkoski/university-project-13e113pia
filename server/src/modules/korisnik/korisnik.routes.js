import { Router } from 'express';
import validator from '~/utils/validator';
import * as validation from './korisnik.validation';
import * as controller from './korisnik.controller';

const router = Router();

router.post('/odbij', validator.body(validation.odbij), controller.odbij);
router.post('/odobri', validator.body(validation.odobri), controller.odobri);

router.get(
  '/korisnik/:id',
  validator.params(validation.korisnik),
  controller.korisnik
);
router.post(
  '/korisnik/:id',
  validator.params(validation.azurirajParams),
  validator.body(validation.azuriraj),
  controller.azuriraj
);
router.delete(
  '/korisnik/:id',
  validator.params(validation.obrisi),
  controller.obrisi
);

router.get('/korisnici-na-cekanju', controller.korisniciNaCekanju);
router.get('/poljoprivrednici', controller.poljoprivrednici);
router.get('/preduzeca', controller.preduzeca);

export default router;
