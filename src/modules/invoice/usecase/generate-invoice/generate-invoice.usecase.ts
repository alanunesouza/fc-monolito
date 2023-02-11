import { Invoice } from '../../domain/invoice.entity';
import InvoiceGateway from "../../gateway/invoice.gateway";
import { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from "./generate-invoice.dto";
import Product from '../../domain/product.entity';
import Id from '../../../@shared/domain/value-object/id.value-object';

export default class GenerateInvoiceUseCase {
  constructor(private _invoiceRepository: InvoiceGateway) {}

  async execute(input: GenerateInvoiceUseCaseInputDto) {

    const products = input.items.map(item => {
      return new Product({
        id: new Id(item.id),
        name: item.name,
        price: item.price,
      });
    })

    const invoice = new Invoice({
      id: new Id(),
      name: input.name,
      document: input.document,
      address: input.address,
      items: products,
    })

    await this._invoiceRepository.save(invoice)

    return {
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      address: invoice.address,
      items: invoice.items.map(item => ({
        id: item.id.id,
        name: item.name,
        price: item.price,
      })),
      total: invoice.total,
    }
  }
}