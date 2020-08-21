/* eslint-disable max-classes-per-file */
import { Model, Optional } from 'sequelize';

export interface OrderProductAttributes {
  id: string;
  quantity: number;
  note?: string;
}
export type OrderProductCreationAttributes = Optional<
  OrderProductAttributes,
  'id' | 'note'
>;
export class OrderProduct
  extends Model<OrderProductAttributes, OrderProductCreationAttributes>
  implements OrderProductAttributes {
  public id!: string;

  public quantity!: number;

  public note: string | undefined;

  // timestamps
  public createdAt!: Date;

  public updatedAt!: Date;

  // MODEL ASSOCIATION METHODS

  // POSSIBLE INCLUSIONS FROM ASSOTIATIONS

  // public static assotations: {
  // };
}
