import InvoiceGateway from "../../gateway/invoice.gateway";
import { FindInvoiceUseCaseInputDto } from "./find-invoice.dto";

export default class FindInvoiceUseCase {
  constructor(private _invoiceRepository: InvoiceGateway) {}

  async execute(input: FindInvoiceUseCaseInputDto) {
    const invoice = await this._invoiceRepository.find(input.id);

    return {
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      address: invoice.address,
      items: invoice.items.map(item => {
        return {
          id: item.id.id,
          name: item.name,
          price: item.price,
        }
      }),
      total: invoice.total,
    }
  }
}