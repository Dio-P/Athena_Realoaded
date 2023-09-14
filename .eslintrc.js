module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb',
  overrides: [
    {
      env: {
        node: true,
        jest: true,

      },
      files: [
        '.eslintrc.{js,cjs}',
        '**/*.test.js',
      ],
      parserOptions: {
        sourceType: 'module',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'react/jsx-filename-extension': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'no-underscore-dangle': 'off',
    'global-require': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/function-component-definition': 'off',
  },
};
