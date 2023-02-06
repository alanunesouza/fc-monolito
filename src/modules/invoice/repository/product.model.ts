import { Column, Model, PrimaryKey, Table, ForeignKey, BelongsTo } from "sequelize-typescript";
import { InvoiceModel } from './invoice.model';

@Table({
  tableName: "products",
  timestamps: false,
})
export class ProductModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string;

  @ForeignKey(() => InvoiceModel)
  @Column({ allowNull: false })
  invoice_id: string;

  @BelongsTo(() => InvoiceModel)
  invoice: InvoiceModel;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  price: number;
}
