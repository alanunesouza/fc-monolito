import { Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { OrderModel } from "./order.model";

@Table({
  tableName: "clients",
  timestamps: false,
})
export class ClientModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  email: string;

  @Column({ allowNull: false })
  document: string;

  @Column({ allowNull: false })
  address: string;

  @Column({ allowNull: false })
  createdAt: Date;

  @Column({ allowNull: false })
  updatedAt: Date;

  @ForeignKey(() => OrderModel)
  @Column({ allowNull: true })
  orderId: string;

}