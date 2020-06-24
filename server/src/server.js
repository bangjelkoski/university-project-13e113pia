/* eslint-disable no-console */
import http from 'http';
import app from '~/app';
import config from '~/config';

const { PORT } = config;

const onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  switch (error.code) {
    case 'EACCES':
      console.error(`Port ${PORT} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`Port ${PORT} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log('==========**********==========');
  console.log('======= SERVER RUNNING =======');
  console.log(`========= PORT ${PORT} ==========`);
  console.log('==========**********==========');
});

server.on('error', onError);
