import Id from '../../../@shared/domain/value-object/id.value-object';
import { Address } from '../../domain/address.value-object';
import Product from '../../domain/product.entity';
import { Invoice } from './../../domain/invoice.entity';

import FindInvoiceUseCase from "./find-invoice.usecase";

const address = new Address({
  street: 'Street 1',
  number: 'Number 1',
  complement: 'Complement 1',
  city: 'City 1',
  state: 'State 1',
  zipCode: 'Zip Code 1',
})

const product = new Product({
  id: new Id('1'),
  name: 'Product 1',
  price: 10,
})

const invoice = new Invoice({
  name: "Client 1",
  document: "12345678901",
  address,
  items: [product],
})

const MockRepository = () => {
  return {
    save: jest.fn(),
    find: jest.fn().mockImplementation(() => Promise.resolve(invoice)),
  }
}

describe('Find Invoice Usecase Unit test', () => {
  it('should find invoice', async () => {
    const repository = MockRepository();
    const usecase = new FindInvoiceUseCase(repository);

    const input = {
      id: '1'
    }

    const result = await usecase.execute(input);

    expect(repository.find).toHaveBeenCalled();
    expect(result.id).toEqual(invoice.id.id)
    expect(result.name).toEqual(invoice.name);
    expect(result.document).toEqual(invoice.document);
    expect(result.street).toEqual(invoice.address.street);
    expect(result.number).toEqual(invoice.address.number);
    expect(result.complement).toEqual(invoice.address.complement);
    expect(result.city).toEqual(invoice.address.city);
    expect(result.state).toEqual(invoice.address.state);
    expect(result.zipCode).toEqual(invoice.address.zipCode);
    expect(result.items[0].id).toEqual(invoice.items[0].id.id);
    expect(result.items[0].name).toEqual(invoice.items[0].name);
    expect(result.items[0].price).toEqual(invoice.items[0].price);
  })
})