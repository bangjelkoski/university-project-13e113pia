import HTTPStatus from 'http-status';
import { Router } from 'express';
import authRoutes from '~/modules/auth/auth.routes';
import korisnikRoutes from '~/modules/korisnik/korisnik.routes';
import narudzbinaRoutes from '~/modules/narudzbina/narudzbina.routes';
import proizvodRoutes from '~/modules/proizvod/proizvod.routes';
import kurirRoutes from '~/modules/kurir/kurir.routes';
import ocenaRoutes from '~/modules/ocena/ocena.routes';
import komentarRoutes from '~/modules/komentar/komentar.routes';
import rasadnikRoutes from '~/modules/rasadnik/rasadnik.routes';
import sadnikRoutes from '~/modules/sadnik/sadnik.routes';
import magacinRoutes from '~/modules/magacin/magacin.routes';
import preduzeceRoutes from '~/modules/preduzece/preduzece.routes';
import listEndpoints from 'express-list-endpoints';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    statusCode: HTTPStatus.OK,
    message: 'Welcome to 13e113pia project API',
  });
});

router.use('/auth/', authRoutes);
router.use('/korisnici/', korisnikRoutes);
router.use('/proizvodi/', proizvodRoutes);
router.use('/narudzbine/', narudzbinaRoutes);
router.use('/kuriri/', kurirRoutes);
router.use('/komentari/', komentarRoutes);
router.use('/ocene/', ocenaRoutes);
router.use('/rasadnici/', rasadnikRoutes);
router.use('/magacini/', magacinRoutes);
router.use('/sadnici/', sadnikRoutes);
router.use('/preduzeca/', preduzeceRoutes);

router.all('*', async (req, res) => {
  res.status(HTTPStatus.NOT_FOUND).json('Страница није пронађена');
});

console.log(listEndpoints(router));

export default router;
