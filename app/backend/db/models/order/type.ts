/* eslint-disable max-classes-per-file */
import { Model, Optional } from 'sequelize';

export interface OrderAttributes {
  id: string;
  num: number;
  modified: boolean;
  canceled: boolean;
}
export type OrderCreationAttributes = Optional<
  OrderAttributes,
  'id' | 'canceled' | 'modified'
>;
export class Order extends Model<OrderAttributes, OrderCreationAttributes>
  implements OrderAttributes {
  public id!: string;

  public num!: number;

  public modified!: boolean;

  public canceled!: boolean;

  // timestamps
  public createdAt!: Date;

  public updatedAt!: Date;

  // MODEL ASSOCIATION METHODS

  // POSSIBLE INCLUSIONS FROM ASSOTIATIONS

  // public static assotations: {
  // };
}
