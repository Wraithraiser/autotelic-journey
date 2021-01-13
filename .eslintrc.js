module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:react/recommended',
  ],
  rules: {
    'react/prop-types': 'warn',
    'react/no-unescaped-entities': 'off',
    'no-console': 'warn',
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
