import swaggerAutogen from 'swagger-autogen';
import { loginRequest, profileResponse } from './login.schema.js'
import { servicesResponse } from './services.schema.js';
import { APP_URL, NODE_ENV } from '../../config/app.config.js';

const scheme = NODE_ENV === 'production' ? 'https' : 'http';

const doc = {
  info: {
    version: '1.0.0',
    title: 'Horas de Servicio API',
    description: 'Demo API para curso de React y Node.js',
  },
  schemes: [scheme],
  host: `${APP_URL}/api/v1`,
  securityDefinitions: {
    "authorization": {
      type: "apiKey",
      in: "header",
      name: "Authorization",
      description: "Authentication token"
    }
  },
  components: {
    loginRequest,
    profileResponse,
    servicesResponse
  }
};

const outputFile = '../../../swagger-output.json';
const routes = ['../../routes/index.js'];

swaggerAutogen()(outputFile, routes, doc)
