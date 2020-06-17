const path = require('path');
const nodeExternals = require('webpack-node-externals');
const Dotenv = require('dotenv-webpack');
const NodemonPlugin = require('nodemon-webpack-plugin'); // Ding

module.exports = {
  entry: './src/server.js',
  mode: process.env.NODE_ENV || 'development',
  watch: process.env.NODE_ENV === 'development',
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js',
  },
  externals: [nodeExternals()],
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [new Dotenv(), new NodemonPlugin()],
};
