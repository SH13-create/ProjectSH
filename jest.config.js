/**
 * Configuration Jest (via le preset jest-expo).
 * On teste surtout la logique pure (zodiaque, score de compatibilité),
 * indépendante de l'UI.
 */
module.exports = {
  preset: 'jest-expo',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: ['**/__tests__/**/*.test.ts?(x)'],
};
