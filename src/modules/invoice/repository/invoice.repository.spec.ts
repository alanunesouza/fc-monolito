import { InvoiceModel } from './invoice.model';
import { Sequelize } from 'sequelize-typescript';
import { ProductModel } from './product.model';
import { Invoice } from '../domain/invoice.entity';
import Product from '../domain/product.entity';
import Id from '../../@shared/domain/value-object/id.value-object';
import { Address } from '../domain/address.value-object';
import InvoiceRepository from './invoice.repository';

describe('Invoice Repository test', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([InvoiceModel, ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should create an invoice', async () => {
    const product = new Product({
      id: new Id("1"),
      name: "Product 1",
      price: 10,
    });

    const invoice = new Invoice({
        id: new Id("1"),
        name: "Invoice 1",
        document: "Invoice document",
        address: new Address({
          city: "City 1",
          state: "State 1",
          street: "Street 1",
          number: "1",
          complement: "Complement 1",
          zipCode: "Zip Code 1",
        }),
        items: [ product ],
        createdAt: new Date(),
        updatedAt: new Date(),
    });

    const repository = new InvoiceRepository();
    await repository.save(invoice);

    const invoiceDb = await InvoiceModel.findOne({
      where: { id: invoice.id.id },
      include: [{ model: ProductModel}]
    })

    expect(invoice.id.id).toEqual(invoiceDb.id);
    expect(invoice.name).toEqual(invoiceDb.name);
    expect(invoice.document).toEqual(invoiceDb.document);
    expect(invoice.address.city).toEqual(invoiceDb.city);
    expect(invoice.address.state).toEqual(invoiceDb.state);
    expect(invoice.address.street).toEqual(invoiceDb.street);
    expect(invoice.address.number).toEqual(invoiceDb.number);
    expect(invoice.address.complement).toEqual(invoiceDb.complement);
    expect(invoice.address.zipCode).toEqual(invoiceDb.zipCode);
    expect(invoice.items[0].id.id).toEqual(invoiceDb.products[0].id);
    expect(invoice.items[0].name).toEqual(invoiceDb.products[0].name);
    expect(invoice.items[0].price).toEqual(invoiceDb.products[0].price);
    expect(invoice.createdAt).toEqual(invoiceDb.createdAt);
    expect(invoice.updatedAt).toEqual(invoiceDb.updatedAt);
  });

  it('should find an invoice', async () => {
    const product = new Product({
      id: new Id("1"),
      name: "Product 1",
      price: 10,
    });

    const invoice = new Invoice({
        id: new Id("1"),
        name: "Invoice 1",
        document: "Invoice document",
        address: new Address({
          city: "City 1",
          state: "State 1",
          street: "Street 1",
          number: "1",
          complement: "Complement 1",
          zipCode: "Zip Code 1",
        }),
        items: [ product ],
        createdAt: new Date(),
        updatedAt: new Date(),
    });

    const repository = new InvoiceRepository();
    await repository.save(invoice);

    const invoiceDb = await repository.find(invoice.id.id)

    expect(invoice.id.id).toEqual(invoiceDb.id.id);
    expect(invoice.name).toEqual(invoiceDb.name);
    expect(invoice.document).toEqual(invoiceDb.document);
    expect(invoice.address.city).toEqual(invoiceDb.address.city);
    expect(invoice.address.state).toEqual(invoiceDb.address.state);
    expect(invoice.address.street).toEqual(invoiceDb.address.street);
    expect(invoice.address.number).toEqual(invoiceDb.address.number);
    expect(invoice.address.complement).toEqual(invoiceDb.address.complement);
    expect(invoice.address.zipCode).toEqual(invoiceDb.address.zipCode);
    expect(invoice.items[0].id.id).toEqual(invoiceDb.items[0].id.id);
    expect(invoice.items[0].name).toEqual(invoiceDb.items[0].name);
    expect(invoice.items[0].price).toEqual(invoiceDb.items[0].price);
    expect(invoice.createdAt).toEqual(invoiceDb.createdAt);
    expect(invoice.updatedAt).toEqual(invoiceDb.updatedAt);

  })
})