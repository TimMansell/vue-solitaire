import commonjs from '@rollup/plugin-commonjs';
// import { terser } from 'rollup-plugin-terser';
import alias from '@rollup/plugin-alias';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';

export default {
  input: 'main.js',
  output: {
    file: 'index.js',
    format: 'cjs',
  },
  plugins: [
    commonjs(),
    nodeResolve({ preferBuiltins: true }),
    json(),
    // terser(),
    alias({
      entries: [{ find: '@', replacement: '../src' }],
    }),
  ],
};
