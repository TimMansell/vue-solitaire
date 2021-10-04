import { uglify } from 'rollup-plugin-uglify';

export default {
  input: 'main.js',
  output: {
    file: 'index.js',
    format: 'cjs',
  },
  plugins: [uglify()],
};
