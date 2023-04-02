const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

import { Options } from './Options';

import {Router} from 'express';

const swaggerSpec = swaggerJSDoc(Options);


export const routesSwagger = Router();

routesSwagger.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
