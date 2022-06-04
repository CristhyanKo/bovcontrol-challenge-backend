module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: ['eslint-plugin-import-helpers', 'prettier'],
  rules: {
    'import/prefer-default-export': 'off',
    radix: 'off',
    'no-console': 'error',
    'global-require': 'off',
    'import/no-named-default': 'off',
    'no-nested-ternary': 'off',
    'consistent-return': 'off',
    'class-methods-use-this': 'off',
    'func-names': 'off',
    'no-useless-escape': 'off',
    'no-underscore-dangle': 'off',
    'prefer-destructuring': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
        semi: false,
        jsxSingleQuote: true,
        singleQuote: true,
        useTabs: true,
        tabWidth: 4,
        printWidth: 150,
      },
    ],
  },
}
