import swaggerAutogen from 'swagger-autogen';
import { APP_URL } from '../config/app.config.js';

const doc = {
  info: {
    title: 'Horas de Servicio API',
    description: 'Demo API para curso de React y Node.js',
  },
  host: `${APP_URL}/api/v1`
};

const outputFile = '../../swagger-output.json';
const routes = ['../routes/index.js'];

swaggerAutogen({ openapi: '3.0.0' })(outputFile, routes, doc);
