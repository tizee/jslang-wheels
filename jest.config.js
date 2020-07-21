// see more on https://jestjs.io/docs/en/configuration
module.exports = {
  coverageDirectory: 'coverage',
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  collectCoverage: true,
  testTimeout: 100000,
};
