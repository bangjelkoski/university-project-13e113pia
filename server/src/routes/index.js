import HTTPStatus from 'http-status';
import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    statusCode: HTTPStatus.OK,
    message: 'Welcome to 13e113pia project API',
  });
});

router.all('*', async (req, res) => {
  res.json({
    message: HTTPStatus[404],
    statusCode: HTTPStatus.NOT_FOUND,
  });
});

export default router;
