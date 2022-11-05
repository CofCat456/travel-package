module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['standard', 'prettier'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    'no-console': 'off'
  }
};
