module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    es6: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  rules: {
    'react/prop-types': 'warn',
    'react/no-unescaped-entities': 'off',
  },
  globals: {
    module: false,
    __dirname: false,
    exports: false,
    require: false,
    __PATH_PREFIX__: false,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
