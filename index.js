const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Routes
const itemsRouter = require('./routes/items');
app.use('/items', itemsRouter);

// Swagger definition
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'My API',
            version: '1.0.0',
            description: 'API documentation using Swagger',
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
            },
        ],
   components: {
     securitySchemes: {
         bearerAuth: {
             type: 'http',
             scheme: 'bearer',
             bearerFormat: 'JWT', 
         },
     },
  },
    },
    apis: ['./routes/*.js'], // Path to your API docs
  };
  
  const swaggerDocs = swaggerJSDoc(swaggerOptions);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  
  

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});