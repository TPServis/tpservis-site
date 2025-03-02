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
    '@typescript-eslint/no-console': ['error', { allow: ['warn', 'error'] }],
    'no-console': ['error', { allow: ['warn', 'error'] }],
  },
}
