const { defaults } = require('ts-jest/presets');
const tsconfig = './tsconfig.json';

module.exports = {
  ...defaults,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coveragePathIgnorePatterns: ['.json'],
  globals: { 'ts-jest': { diagnostics: true, tsconfig } },
  moduleFileExtensions: ['ts', 'js', 'json'],
  preset: 'ts-jest',
  rootDir: '.',
  roots: ['<rootDir>'],
  setupFiles: ['dotenv/config'],
  testEnvironment: 'node',
  testPathIgnorePatterns: ['<rootDir>/__tests__/_/', '<rootDir>/lib/'],
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.ts$',
  transformIgnorePatterns: ['node_modules/(?!(@posted)/)'],
};
