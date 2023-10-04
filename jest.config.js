export default {
    testEnvironment: 'node',
    roots: ['./tests'],
    testRegex: '\\.test\\.js$',
    transform: {
        '^.+\\.js$': 'babel-jest',
      },
  };