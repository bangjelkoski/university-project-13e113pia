import HTTPStatus from 'http-status';
import { Router } from 'express';
import authRoutes from '~/modules/auth/auth.routes';
import listEndpoints from 'express-list-endpoints';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    statusCode: HTTPStatus.OK,
    message: 'Welcome to 13e113pia project API',
  });
});

router.use('/auth/', authRoutes);

router.all('*', async (req, res) => {
  res.json({
    message: HTTPStatus[404],
    statusCode: HTTPStatus.NOT_FOUND,
  });
});

console.log(listEndpoints(router));

export default router;
