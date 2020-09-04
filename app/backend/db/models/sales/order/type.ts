/* eslint-disable max-classes-per-file */
import {
  Model,
  Optional,
  HasManyGetAssociationsMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyRemoveAssociationMixin,
  Association,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  HasManyAddAssociationsMixin,
} from 'sequelize';
import { OrderProduct } from '../orderProducts/type';
import { User } from '../../rbac/user/type';

export interface OrderAttributes {
  id: string;
  num: number;
  type: string;
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

  public type!: string;

  public modified!: boolean;

  public canceled!: boolean;

  // timestamps
  public createdAt!: Date;

  public updatedAt!: Date;

  // MODEL ASSOCIATION METHODS
  // OrderProduct-Order
  public getOrderPoducts!: HasManyGetAssociationsMixin<OrderProduct>;

  public addOrderProducts!: HasManyAddAssociationsMixin<OrderProduct, string>;

  public createOrderProduct!: HasManyCreateAssociationMixin<OrderProduct>;

  public removeOrderProduct!: HasManyRemoveAssociationMixin<
    OrderProduct,
    string
  >;

  public countOrderProducts!: HasManyCountAssociationsMixin;

  // User-OrderProduct
  public getUser!: BelongsToGetAssociationMixin<User>;

  public setUser!: BelongsToSetAssociationMixin<User, string>;

  // POSSIBLE INCLUSIONS FROM ASSOTIATIONS
  public readonly orderProducts?: OrderProduct[];

  public readonly user?: User;

  public static associations: {
    orderProducts: Association<OrderProduct, Order>;
    user: Association<User, Order>;
  };
}
