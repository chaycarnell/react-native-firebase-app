module.exports = {
  root: true,
  extends: ['@react-native'],
  rules: {
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
  },
  plugins: ['simple-import-sort'],
};
