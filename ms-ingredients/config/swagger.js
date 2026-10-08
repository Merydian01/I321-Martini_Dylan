// config/swagger.js
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Ingredients API',
            version: '1.0.0',
            description: 'Microservice REST pour les ingrédients.'
        },
        servers: [
            { url: 'http://localhost:3001', description: 'Local dev server' }
        ]
    },
    apis: ['./routes/*.js', './controllers/*.js']
};

module.exports = swaggerJSDoc(options);
