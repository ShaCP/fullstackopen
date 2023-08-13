export default {
  testEnvironment: "node",
  transform: {},
  globalTeardown: "./tests/teardown.js",
  // to avoid the error: Jest did not exit one second after the test run has completed.
  // see https://fullstackopen.com/en/part4/testing_the_backend for other options
  testTimeout: 100000
};
