import Sequelize from 'sequelize';
import config from '~/config';

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_DIALECT, DB_PORT } = config;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT,
  port: DB_PORT,
  // eslint-disable-next-line no-console
  logging: console.log,
  timezone: '+02:00',
});

const db = {
  sequelize,
  Sequelize,
};

export default db;
