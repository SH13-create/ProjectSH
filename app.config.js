/**
 * Config Expo dynamique.
 * On part de app.json et on injecte un "baseUrl" UNIQUEMENT quand la variable
 * d'environnement EXPO_BASE_URL est définie (déploiement GitHub Pages, où le
 * site est servi sous /projectsh/). En local, rien ne change (base = "/").
 */
module.exports = ({ config }) => {
  const baseUrl = process.env.EXPO_BASE_URL;
  return {
    ...config,
    experiments: {
      ...(config.experiments || {}),
      ...(baseUrl ? { baseUrl } : {}),
    },
  };
};
