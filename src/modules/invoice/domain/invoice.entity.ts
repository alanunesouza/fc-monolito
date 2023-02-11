import BaseEntity from "../../@shared/domain/entity/base.entity";
import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import Id from "../../@shared/domain/value-object/id.value-object";
import Product from "./product.entity";

type InvoiceProps = {
  id?: Id;
  name: string;
  document: string
  address: string // value object
  items: Product[] // Product entity
  createdAt?: Date // criada automaticamente
  updatedAt?: Date // criada automaticamente
};

export class Invoice extends BaseEntity implements AggregateRoot {
  private _name: string;
  private _document: string;
  private _address: string;
  private _items: Product[];

  constructor(props: InvoiceProps) {
    super(props.id, props.createdAt, props.updatedAt);
    this._name = props.name;
    this._document = props.document;
    this._address = props.address;
    this._items = props.items;
  }

  get name(): string {
    return this._name;
  }

  get document(): string {
    return this._document;
  }

  get address(): string {
    return this._address;
  }

  get items(): Product[] {
    return this._items;
  }

  get total(): number {
    return this._items.reduce((total, item) => {
      return total + item.price;
    }, 0);
  }
}
