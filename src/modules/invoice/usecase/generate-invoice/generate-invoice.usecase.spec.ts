
import GenerateInvoiceUseCase from "./generate-invoice.usecase";

const MockRepository = () => {
  return {
    save: jest.fn(),
    find: jest.fn()
  }
}

describe('Generate Invoice Usecase Unit test', () => {
  it('should generate invoice', async () => {
    const repository = MockRepository();
    const usecase = new GenerateInvoiceUseCase(repository);

    const input = {
      id: '1',
      name: 'Client 1',
      document: '12345678901',
      street: 'Street 1',
      number: 'Number 1',
      complement: 'Complement 1',
      city: 'City 1',
      state: 'State 1',
      zipCode: 'Zip Code 1',
      items: [
        {
            id: "1",
            name: "Product 1",
            price: 10,
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await usecase.execute(input);

    expect(repository.save).toHaveBeenCalled();
    expect(result.id).toBeDefined();
    expect(result.name).toEqual(input.name);
    expect(result.document).toEqual(input.document);
    expect(result.street).toEqual(input.street);
    expect(result.number).toEqual(input.number);
    expect(result.complement).toEqual(input.complement);
    expect(result.city).toEqual(input.city);
    expect(result.state).toEqual(input.state);
    expect(result.zipCode).toEqual(input.zipCode);
    expect(result.items).toEqual(input.items);
  })
})