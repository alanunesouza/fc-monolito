import InvoiceFacade from "../facade/invoice.facade";
import InvoiceRepository from "../repository/invoice.repository";
import GenerateInvoiceUseCase from "../usecase/generate-invoice/generate-invoice.usecase";
import FindInvoiceUseCase from "../usecase/find-invoice/find-invoice.usecase";

export default class InvoiceFacadeFactory {
  static create() {
    const invoiceRepository = new InvoiceRepository();
    const generateInvoiceUsecase = new GenerateInvoiceUseCase(invoiceRepository);
    const findInvoiceUsecase = new FindInvoiceUseCase(invoiceRepository);
    const invoiceFacade = new InvoiceFacade({
      generateInvoiceUsecase,
      findInvoiceUsecase,
    });

    return invoiceFacade;
  }
}
