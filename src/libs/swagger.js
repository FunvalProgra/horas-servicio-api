import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        title: 'Horas de Servicio API',
        description: 'Demo API para curso de React y Node.js',
    },
    host: 'localhost:3000/api/v1'
};

const outputFile = '../../swagger-output.json';
const routes = ['../routes/index.js'];

swaggerAutogen({ openapi: '3.0.0' })(outputFile, routes, doc).then(async () => {
    await import('../index.js');
});