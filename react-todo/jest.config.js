// react-todo/jest.config.js
/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'jsdom', // CRUCIAL for React Testing Library
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest', // CRUCIAL for transforming JSX
  },
  moduleNameMapper: {
    // Required to prevent CSS imports from breaking tests
    "\\.(css|less|sass|scss)$": "identity-obj-proxy", 
  },
};

module.exports = config;