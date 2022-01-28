module.exports = {
  extends: ['@react-native-community', 'airbnb-typescript', 'prettier'],
  parserOptions: {
    project: ['./tsconfig.json'],
  },
  parser: '@typescript-eslint/parser',
  env: {
    es6: true,
    browser: true,
    node: true,
    jest: true,
  },
  rules: {
    'import/prefer-default-export': 'off',
    'no-use-before-define': 'off',
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    'react-native/no-inline-styles': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      alias: {
        map: [
          ['@auth', './src/auth'],
          ['@components', './src/components'],
          ['@screens', './src/screens'],
          ['@utils', './src/utils'],
        ],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
      },
    },
  },
};
