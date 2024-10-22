import swaggerAutogen from 'swagger-autogen';
import { APP_URL } from '../config/app.config.js';

const scheme = process.env.NODE_ENV === 'production' ? 'https' : 'http';

const doc = {
  info: {
    title: 'Horas de Servicio API',
    description: 'Demo API para curso de React y Node.js',
  },
  schemes: [scheme],
  host: `${APP_URL}/api/v1`
};

const outputFile = '../../swagger-output.json';
const routes = ['../routes/index.js'];

swaggerAutogen({ openapi: '3.0.0' })(outputFile, routes, doc);
