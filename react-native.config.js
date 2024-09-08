module.exports = {
  assets: ['./src/assets/fonts'],  // This tells React Native where your custom fonts are located
  dependencies: {
    'react-native-vector-icons': {
      platforms: {
        ios: null,  // This disables auto-linking for iOS for react-native-vector-icons since it may already be linked manually in the Xcode project
      },
    },
  },
};