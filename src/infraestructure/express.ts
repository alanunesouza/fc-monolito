import { InvoiceModel } from './../modules/invoice/repository/invoice.model';
import { ClientModel } from './../modules/client-adm/repository/client.model';
import { OrderModel as CheckoutOrderModel } from './../modules/checkout/repository/order.model';
import { ProductModel } from './../modules/product-adm/repository/product.model';
import { Sequelize } from 'sequelize-typescript';
import express, { Express } from 'express';
import { rootRoute } from './routes';
import TransactionModel from '../modules/payment/repository/transaction.model';
import { ProductModel as StoreCatalogProductModel} from "../modules/store-catalog/repository/product.model";
import { ProductModel as CheckoutProductModel} from "../modules/checkout/repository/product.model";
import { ProductModel as InvoiceProductModel} from "../modules/invoice/repository/product.model";

export const app: Express = express()

app.use(express.json())
app.use(rootRoute)

export let sequelize: Sequelize;

async function setupDb() {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
  });
  await sequelize.addModels([
    ClientModel, 
    InvoiceModel, 
    TransactionModel,
    CheckoutOrderModel,
    StoreCatalogProductModel,
    // CheckoutProductModel,
    // InvoiceProductModel,
    ProductModel, 
  ]);
  await sequelize.sync();
}
setupDb();
