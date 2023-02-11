import { app } from "../express";
import request from "supertest";
import { Sequelize } from "sequelize-typescript";
import { InvoiceModel } from "../../modules/invoice/repository/invoice.model";
import { ProductModel } from "../../modules/invoice/repository/product.model";

describe("E2E test for invoice", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([
        InvoiceModel,
        ProductModel
    ]);
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a invoice", async () => {
    const { body: outputInvoiceCreated, status } = await request(app)
    .post("/invoice")
    .send({
        name: "invoice 1",
        document: "document 1",
        address: "address 1",
        items: [
            {
                id: "1",
                name: "product 1",
                price: 100
            },
            {
                id: "2",
                name: "product 2",
                price: 200
            }
        ]
    });

    expect(status).toBe(200);
    expect(outputInvoiceCreated.name).toBe("invoice 1");
    expect(outputInvoiceCreated.document).toBe("document 1");
    expect(outputInvoiceCreated.address).toBe("address 1");
    expect(outputInvoiceCreated.items[0].name).toBe("product 1");
    expect(outputInvoiceCreated.items[0].price).toBe(100);
    expect(outputInvoiceCreated.items[1].name).toBe("product 2");
    expect(outputInvoiceCreated.items[1].price).toBe(200);
    
    const response = await request(app).get(`/invoice/${outputInvoiceCreated.id}`)

    expect(response.status).toBe(200);
  });
});
