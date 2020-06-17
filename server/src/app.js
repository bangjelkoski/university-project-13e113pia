import express from 'express';
import compression from 'compression';
import cors from 'cors';
import methodOverride from 'method-override';
import debug from 'debug';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import { ValidationError } from 'express-validation';
import APIClientError from '~/classes/APIClientError';

import routes from './routes';
import database from './database';

const app = express();
const log = debug('app');

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
database.sequelize
  .authenticate()
  .then(() => {
    log('Connected to the database');
  })
  .catch((err) => {
    log('Unable to connect to the database: ', err);
  });

database.sequelize.sync({ force: false });

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
  if (err instanceof APIClientError) {
    return res.status(err.status).json(err.toJson());
  }

  return next(err);
});

/**
 * Unhandled Errors
 */
process.on('unhandledRejection', (error) => {
  console.error('Uncaught Error', error);
});

export default app;
