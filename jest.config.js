module.exports = {
  verbose: false,
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/server/*.js', '<rootDir>/server/**/*.js'],
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/server/tests/setup.js'],
  setupFilesAfterEnv: ['<rootDir>/server/tests/jest.setup.js'],
  moduleNameMapper: {
    'Mocks(.*)$': '<rootDir>/server/tests/__mocks__/$1',
  },
};
