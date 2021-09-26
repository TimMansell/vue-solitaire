module.exports = {
  extends: ['plugin:cypress/recommended'],
  plugins: ['cypress'],
  env: {
    mocha: true,
    'cypress/globals': true,
  },
  rules: {
    strict: 'off',
    'cypress/no-unnecessary-waiting': 'off',
  },
};
