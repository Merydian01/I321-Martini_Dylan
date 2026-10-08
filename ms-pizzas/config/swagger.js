// config/swagger.js
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Pizzas API',
            version: '1.0.0',
            description: 'Microservice REST pour les pizzas et leurs compositions.'
        },
        servers: [
            { url: 'http://localhost:3000', description: 'Local dev server' }
        ]
    },
    apis: ['./routes/*.js', './controllers/*.js']
};

module.exports = swaggerJSDoc(options);
