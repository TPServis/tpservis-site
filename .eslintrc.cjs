module.exports = {
  extends: 'next',
  root: true,
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  rules: {
    'no-unused-vars': 'error',
    'react/no-string-refs': 'off',
  },
}
