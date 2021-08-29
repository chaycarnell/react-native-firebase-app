module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
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
          '@screens': './src/screens',
          '@assets': './src/assets',
          '@styles': './src/styles',
          '@components': './src/components',
          '@utils': './src/utils',
        },
      },
    ],
  ],
};
