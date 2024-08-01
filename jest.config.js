const baseConfig = require('./jest.base.config');

module.exports = {
  ...baseConfig,
  roots: ['<rootDir>/src/'],
  coverageDirectory: '<rootDir>/coverage/qred-frontend-test',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.html$',
      astTransformers: [
        'jest-preset-angular/build/InlineFilesTransformer',
        'jest-preset-angular/build/StripStylesTransformer',
      ],
    },
  },
  coverageThreshold: {
    global: {
      statements: 1,
      branches: 0,
      lines: 1,
      functions: 1,
    },
  },
};
