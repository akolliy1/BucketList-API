module.exports = {
  verbose: false,
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/*.js', '<rootDir>/src/**/*.js'],
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/server/tests/setup.js'],
  setupTestFrameworkScriptFile: '<rootDir>/server/tests/jest.setup.js',
  moduleNameMapper: {
    'Mocks(.*)$': '<rootDir>/tests/__mocks__/$1',
  },
};
