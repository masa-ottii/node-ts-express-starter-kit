module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'prettier/prettier': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true,
      },
    },
  ],
};
