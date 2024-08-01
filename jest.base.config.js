const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.spec.json');

module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testMatch: ['**/+(*.)+(spec).+(ts)?(x)'],
  transform: {
    '^.+\\.(ts|html)$': 'jest-preset-angular',
    '^.+\\.js$': 'babel-jest',
  },
  transformIgnorePatterns: ['^.+\\.js$'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || {}, {
    prefix: '<rootDir>/',
  }),
  roots: [
    "<rootDir>"
  ],
  modulePaths: [
    "<rootDir>"
  ],
  moduleDirectories: [
    "node_modules"
  ],
  collectCoverageFrom: [
    '<rootDir>/src/**/**/*.ts',
    '!<rootDir>/src/**/**/*.module.ts',
    '!<rootDir>/src/**/**/*.enum.ts',
    '!<rootDir>/src/**/**/*.model.ts',
    '!<rootDir>/src/**/**/*.type.ts',
    '!<rootDir>/src/**/**/*.config.ts',
    '!<rootDir>/src/**/**/*.mock.ts',
    '!<rootDir>/src/**/environments/**',
    '!<rootDir>/src/**/main.ts',
    '!<rootDir>/src/**/**/index.ts',
    '!<rootDir>/src/**/polyfills.ts',
    '!**/node_modules/**',
  ],
  moduleFileExtensions: ['ts', 'html', 'js', 'json', 'mjs'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
};
