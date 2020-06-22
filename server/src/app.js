import express from 'express';
import compression from 'compression';
import cors from 'cors';
import methodOverride from 'method-override';
import debug from 'debug';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import { ValidationError } from 'express-validation';
import ApiError from '~/handlers/ApiError';
import cron from 'node-cron';
import routes from './routes';
import database from './database';
import { rasadniciCron, sadniciCron } from './handlers/cron';

const app = express();
const log = debug('app');

const init = async () => {
  /**
   * App Middleware
   */
  app.use(cors());
  app.use(methodOverride());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(compression());
  app.use(helmet());

  /**
   * Database Setup
   */
  await database.sequelize.authenticate();

  /**
   * Database migrations
   *
   database.sequelize.sync({ force: true });
  */

  cron.schedule('* * * * *', async () => await rasadniciCron());
  cron.schedule('* * * * *', async () => await sadniciCron());

  /**
   * API Routes
   */
  app.use(routes);

  /**
   * Validation Errors
   */
  app.use((err, req, res, next) => {
    if (err instanceof ValidationError) {
      return res.status(err.status).json(err);
    }

    return next(err);
  });

  /**
   * API Errors
   */
  app.use((err, req, res, next) => {
    if (err instanceof ApiError) {
      return res.status(err.status).json(err.toJson());
    }

    return next(err);
  });

  /**
   * Unhandled Errors
   */
  process.on('unhandledRejection', (error) => {
    // eslint-disable-next-line no-console
    console.error('Uncaught Error', error);
  });
};

export default init;
