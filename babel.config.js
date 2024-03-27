module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          '@root': './src',
          '@screens': './src/screens/index',
          '@assets': './src/assets/',
          '@theme': './src/theme/index',
          '@types': './src/types/index',
          '@components': './src/components/index',
          '@utils': './src/utils/',
          '@auth': './src/auth/index',
        },
      },
    ],
  ],
};
