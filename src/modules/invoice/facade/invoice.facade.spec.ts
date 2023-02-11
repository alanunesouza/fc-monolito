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
      address: "Rua Test",
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
    expect(result.address).toBe(input.address);
    expect(result.products[0].id).toBe(input.items[0].id);
    expect(result.products[0].name).toBe(input.items[0].name);
    expect(result.products[0].price).toBe(input.items[0].price);
  });
});
