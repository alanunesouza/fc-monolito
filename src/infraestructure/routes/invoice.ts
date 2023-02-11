import express, { Request, Response } from 'express';
import FindInvoiceUseCase from '../../modules/invoice/usecase/find-invoice/find-invoice.usecase';
import InvoiceRepository from '../../modules/invoice/repository/invoice.repository';
import GenerateInvoiceUseCase from '../../modules/invoice/usecase/generate-invoice/generate-invoice.usecase';
import { Sequelize } from 'sequelize-typescript';
import { ProductModel } from '../../modules/invoice/repository/product.model';
import { InvoiceModel } from '../../modules/invoice/repository/invoice.model';

export const invoiceRoute = express.Router();

export let sequelize: Sequelize;

async function setupDb() {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
  });
  await sequelize.addModels([
    InvoiceModel,
    ProductModel
  ]);
  await sequelize.sync();
}
setupDb()

invoiceRoute.post("/", async (req: Request, res: Response) => {
  const usecase = new GenerateInvoiceUseCase(new InvoiceRepository());
  const invoiceDto = {
      name: req.body.name,
      document: req.body.document,
      address: req.body.address,
      items: req.body.items
  }
  const output = await usecase.execute(invoiceDto);
  res.send(output);
});

invoiceRoute.get('/:invoiceId', async (req: Request, res: Response) => {
  const usecase = new FindInvoiceUseCase(new InvoiceRepository());
  const invoiceId = String(req.params.invoiceId);
  console.log(invoiceId);
  const output = await usecase.execute({ id: invoiceId });
  res.send(output);
});