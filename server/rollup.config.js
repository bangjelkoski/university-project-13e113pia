import path from 'path';
import alias from '@rollup/plugin-alias';
import run from '@rollup/plugin-run';
import babel from 'rollup-plugin-babel';
import localResolve from 'rollup-plugin-local-resolve';
import dotenv from 'dotenv';
import commonjs from 'rollup-plugin-commonjs';

dotenv.config();

export default {
  input: 'src/server.js',
  output: {
    file: 'build/index.js',
    format: 'cjs',
  },
  plugins: [
    localResolve(),
    alias({
      entries: [{ find: '~', replacement: path.resolve(__dirname, 'src') }],
    }),
    babel({
      exclude: 'node_modules/**',
      presets: [
        [
          '@babel/env',
          {
            targets: {
              esmodules: true,
            },
          },
        ],
      ],
      plugins: ['babel-plugin-add-module-exports'],
    }),
    commonjs(),
    process.env.NODE_ENV !== 'production' && run(),
  ],
};
