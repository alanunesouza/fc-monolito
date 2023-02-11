import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for client", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a client", async () => {
    const input = {
      name: 'Cliente Teste',
      document: '12345678901',
      email: 'a@a.com',
      address: 'Rua Teste',
    };
    const response = await request(app)
      .post("/clients")
      .send(input);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe(input.name);
    expect(response.body.document).toBe(input.document);
    expect(response.body.email).toBe(input.email);
    expect(response.body.address).toBe(input.address);
  });
});
