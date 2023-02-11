
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
      address: 'Rua Test',
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
    expect(result.address).toEqual(input.address);
    expect(result.items).toEqual(input.items);
  })
})