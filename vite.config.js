/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'path';

export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/cards')],
      symbolId: 'card-[dir]-[name]',
    }),
  ],
  server: {
    port: 8080,
    proxy: {
      '^/.netlify/functions/graphql': 'http://localhost:9000',
    },
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(process.cwd(), './src'),
      },
      {
        find: '@@',
        replacement: path.resolve(process.cwd(), './'),
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
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['**/__tests__/*.[jt]s?(x)'],
  },
});
