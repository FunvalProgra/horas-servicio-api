import swaggerAutogen from 'swagger-autogen';
import { loginRequest, profileResponse } from './login.schema.js'
import { servicesResponse } from './services.schema.js';
import { APP_URL, NODE_ENV } from '../../config/app.config.js';

const scheme = NODE_ENV === 'production' ? 'https' : 'http';

const doc = {
  info: {
    version: '1.0.0',
    title: 'Horas de Servicio API',
    description: 'This API provides endpoints for managing service hours, user authentication, and various other functionalities for the Horas de Servicio application. It is built using Next.js and Node.js. The API is RESTful and all endpoints are documented here.\n\n Test accounts:\n Admin: admin@service.com\n Controller: controller@service.com\n Recruiter: recruiter@service.com\n Student: student@services.com \n\n Password: Funval2024'
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
