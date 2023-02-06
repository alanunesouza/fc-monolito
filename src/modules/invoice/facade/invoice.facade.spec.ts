import { ProductModel } from '../repository/product.model';
import { Sequelize } from "sequelize-typescript";
import { InvoiceModel } from "../repository/invoice.model";
import InvoiceFacadeFactory from '../factory/invoice.facade.factory';

describe("InvoiceFacade test", () => {
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

  it("should generate a invoice", async () => {
    const invoiceFacade = InvoiceFacadeFactory.create();

    const input = {
      name: "Client 1",
      document: "12345678901",
      street: "Street 1",
      number: "Number 1",
      complement: "Complement 1",
      city: "City 1",
      state: "State 1",
      zipCode: "Zip Code 1",
      items: [
        {
          id: "1",
          name: "Product 1",
          price: 10,
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const output = await invoiceFacade.generate(input);
    const result = await InvoiceModel.findOne({ where: { id: output.id }, include: [{ model: ProductModel }] })

    expect(result.id).toBeDefined();
    expect(result.name).toBe(input.name);
    expect(result.document).toBe(input.document);
    expect(result.street).toBe(input.street);
    expect(result.number).toBe(input.number);
    expect(result.complement).toBe(input.complement);
    expect(result.city).toBe(input.city);
    expect(result.state).toBe(input.state);
    expect(result.zipCode).toBe(input.zipCode);
    expect(output.items[0].id).toBe(input.items[0].id);
    expect(output.items[0].name).toBe(input.items[0].name);
    expect(output.items[0].price).toBe(input.items[0].price);
  });
});
