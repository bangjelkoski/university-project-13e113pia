import { Router } from 'express';
import validator from '~/utils/validator';
import * as validation from './korisnik.validation';
import * as controller from './korisnik.controller';

const router = Router();

router.get(
  '/:id/narucio-proizvod/:proizvodId',
  validator.params(validation.narucioProizvod),
  controller.narucioProizvod
);

router.get('/na-cekanju', controller.korisniciNaCekanju);
router.get('/poljoprivrednici', controller.poljoprivrednici);
router.get('/preduzeca', controller.preduzeca);

router.post('/:id/odbij', validator.params(validation.odbij), controller.odbij);
router.post(
  '/:id/odobri',
  validator.params(validation.odobri),
  controller.odobri
);

router.get('/:id', validator.params(validation.korisnik), controller.korisnik);
router.post(
  '/:id',
  validator.params(validation.azurirajParams),
  validator.body(validation.azuriraj),
  controller.azuriraj
);
router.delete('/:id', validator.params(validation.obrisi), controller.obrisi);

export default router;
