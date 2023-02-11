import { invoiceRoute } from './invoice';
import { productsRoute } from './products';
import express from 'express';
import { clientsRoute } from './clients';
import { checkoutRoute } from './checkout';

export const rootRoute = express.Router();

rootRoute.use('/products', productsRoute);
rootRoute.use('/clients', clientsRoute);
rootRoute.use('/invoice', invoiceRoute);
rootRoute.use("/checkout", checkoutRoute);
