// see more on https://jestjs.io/docs/en/configuration
module.exports = {
  coverageDirectory: 'coverage',
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  testPathIgnorePatterns: ['/node_modules/', '/PromiseAplus/', '/example/'],
  collectCoverage: true,
  testTimeout: 100000,
};
