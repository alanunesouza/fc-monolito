import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import InvoiceFacadeInterface, { FindInvoiceFacadeInputDto, FindInvoiceFacadeOutputDto, GenerateInvoiceFacadeInputDto, GenerateInvoiceFacadeOutputDto } from "./invoice.facade.interface";

type InvoiceFacadeProps = {
  generateInvoiceUsecase: UseCaseInterface,
  findInvoiceUsecase: UseCaseInterface,
}

export default class InvoiceFacade implements InvoiceFacadeInterface {
  private _generateInvoiceUsecase: UseCaseInterface;
  private _findInvoiceUsecase: UseCaseInterface;

  constructor(usecasesProps: InvoiceFacadeProps) {
    this._generateInvoiceUsecase = usecasesProps.generateInvoiceUsecase;
    this._findInvoiceUsecase = usecasesProps.findInvoiceUsecase;
  }

  async generate(input: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceFacadeOutputDto> {
   return this._generateInvoiceUsecase.execute(input);
  }

  async find(input: FindInvoiceFacadeInputDto): Promise<FindInvoiceFacadeOutputDto> {
    return this._findInvoiceUsecase.execute(input);
  }
}