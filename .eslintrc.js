module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'airbnb-base',
    'plugin:vue/strongly-recommended',
    'plugin:vue-scoped-css/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['jest', 'prettier'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  ignorePatterns: ['server/index.js'],
  rules: {
    'import/no-cycle': 'off',
    'import/no-unresolved': [2, { ignore: ['@'] }],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: [
          'state', // for vuex state
        ],
      },
    ],
    'vue/max-attributes-per-line': 'off',
    'vue/html-self-closing': [
      'error',
      {
        html: {
          normal: 'always',
          void: 'always',
        },
      },
    ],
    'vue/singleline-html-element-content-newline': 'off',
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)'],
      env: {
        jest: true,
      },
    },
  ],
};
