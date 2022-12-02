module.exports = {
  collectCoverageFrom: ['src/**/*.ts'],
  coveragePathIgnorePatterns: ['/__tests__/'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  preset: 'ts-jest',
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  testRegex: '/src.*/__tests__/*/.*spec.ts$',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  verbose: true,
};
