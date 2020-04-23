module.exports = {
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
};
