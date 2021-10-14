const nodeExternals = require('webpack-node-externals');
const path = require('path');

module.exports = {
  externals: [nodeExternals()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../../src/'),
    },
  },
};
