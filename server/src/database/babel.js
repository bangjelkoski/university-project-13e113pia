require('@babel/register')({
  extends: './src/database/.babelrc',
});

module.exports = require('./config');
