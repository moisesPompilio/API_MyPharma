import dotenv from 'dotenv';

const result = dotenv.config();

if (result.error) {
  Promise.reject(result.error);
}

const PORT = process.env.PORT;
const urlAPI = `http://localhost:${PORT}`

const DOCKER_PORT = process.env.DOCKER_PORT;
const urlDOCKER = `http://localhost:${DOCKER_PORT}`

export const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API MyPharma test',
    version: '1.0.0',
    description:
      'MyPharma technical test api',
    license: {
      name: 'Repository-GitHub',
      url: 'https://github.com/moisesPompilio/testeUbots',
    },
    contact: {
      name: 'Developer Website ',
      url: 'https://github.com/moisesPompilio/'
    },
  },
  servers: [
    {
      url: urlDOCKER,
      description: 'Development server DOCKER',
    },
    {
      url: urlAPI,
      description: 'Development server',
    },
  ],
};

export const Options = {
  swaggerDefinition,
  apis: ['./src/interfaces/routes/*.ts', './src/application/DTO/**/*.ts', "./src/domain/entities/*.ts"],
};