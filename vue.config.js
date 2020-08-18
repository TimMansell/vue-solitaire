const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = {
  devServer: {
    proxy: {
      '/.netlify': {
        target: 'http://localhost:9000',
        pathRewrite: { '^/.netlify/functions': '' },
      },
    },
  },
  chainWebpack: (config) => {
    config.module
      .rule('svg-sprite')
      .use('svgo-loader')
      .loader('svgo-loader');
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: "@import '~@/components/vars.scss';",
      },
    },
  },
  configureWebpack: {
    plugins: [
      new StyleLintPlugin({
        files: ['**/*.{vue,scss}'],
      }),
    ],
  },
};
