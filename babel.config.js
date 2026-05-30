module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Reanimated 4 utilise le plugin worklets. Il DOIT rester le dernier.
      'react-native-worklets/plugin',
    ],
  };
};
