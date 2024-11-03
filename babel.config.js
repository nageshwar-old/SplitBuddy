module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],  // Set the root directory (usually the src folder)
        alias: {
          '@app': './src',
          '@assets': './src/assets',
          '@config': './src/config',
          '@constants': './src/constants',
          '@components': './src/components',
          '@screens': './src/screens',
          '@navigation': './src/navigation',
          '@context': './src/context',
          '@types': './src/types',
          '@hooks': './src/hooks',
          '@utils': './src/utils',
          '@services': './src/store/services',
          '@slices': './src/store/slices',
          '@sagas': './src/store/sagas',
          '@store': './src/store',
        },
      },
    ],
  ],
};