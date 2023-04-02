import express from 'express';

import { routesCategory } from './Category.routes';
import { routesSwagger } from '../../infrastructure/swagger/router';
import { routesProduct } from './Product.routes';


export const routes = express();

routes.use("/category",routesCategory);
routes.use("/product",routesProduct);
routes.use("/swagger", routesSwagger)