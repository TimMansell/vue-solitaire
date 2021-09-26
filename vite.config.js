import { defineConfig } from 'vite';
import { createVuePlugin } from 'vite-plugin-vue2';
import viteSvgIcons from 'vite-plugin-svg-icons';
import path from 'path';

export default defineConfig({
  plugins: [
    createVuePlugin(),
    viteSvgIcons({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/cards')],
      symbolId: 'card-[dir]-[name]',
    }),
  ],
  server: {
    port: 8080,
    proxy: {
      '/.netlify/functions/graphql': 'http://localhost:9000',
    },
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src'),
      },
    ],
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: "@import 'src/components/vars.scss';",
      },
    },
  },
});
