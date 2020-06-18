require('dotenv').config();
require('@babel/register', {
  presets: ['es2015'],
  plugins: ['add-module-exports'],
});

const {
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_DIALECT,
  DB_PORT,
} = process.env;

/** Only used in the Sequelize CLI for seeding the database */
module.exports = {
  development: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    port: DB_PORT,
    dialect: DB_DIALECT,
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
};
