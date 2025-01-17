module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  globals: {
    graphql: false,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  // 0 = off, 1 = warning, 2 = error (you passed "3")
  rules: {
    indent: 0,
    'react/jsx-key': 2,
    'react/display-name': 0,
    'react/prop-types': 0,
    // semi: [2, 'never'],
  },
};
