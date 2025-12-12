// react-todo/jest.config.js

/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  transform: {
    // Use babel-jest for transforming JSX files
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    // Handle module aliases (if any are used in the project)
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
  },
};

module.exports = config;