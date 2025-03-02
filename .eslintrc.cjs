module.exports = {
  extends: 'next',
  root: true,
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  rules: {
    'no-unused-vars': 'off',
    'react/no-string-refs': 'off',
    'no-console': ['error', { allow: ['warn', 'error'] }],
  },
}
