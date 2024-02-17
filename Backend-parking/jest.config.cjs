// jest.config.cjs
module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.js$': 'babel-jest',
  },

  globals: {
    // Especifica la URL de tu servidor de desarrollo aquí
    serverURL: 'http://localhost:4000',
  },
};
