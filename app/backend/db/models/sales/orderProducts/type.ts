/* eslint-disable max-classes-per-file */
import {
  Model,
  Optional,
  BelongsToGetAssociationMixin,
  Order,
  BelongsToManyGetAssociationsMixin,
  BelongsToManyHasAssociationMixin,
  BelongsToManyHasAssociationsMixin,
  BelongsToManyAddAssociationMixin,
  BelongsToManyAddAssociationsMixin,
  BelongsToManyRemoveAssociationMixin,
  BelongsToManyRemoveAssociationsMixin,
  Association,
  BelongsToSetAssociationMixin,
} from 'sequelize';
// eslint-disable-next-line import/no-cycle
import { Suppliment } from '../../products/suppliment/type';
// eslint-disable-next-line import/no-cycle
import { Product } from '../../products/product/type';
// eslint-disable-next-line import/no-cycle
import { OrderProductSuppliment } from '../orderProductSuppliments/type';

export interface OrderProductAttributes {
  id: string;
  quantity: number;
  note?: string;
  orderId: string;
  productId: string;
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

  public orderId!: string;

  public productId!: string;

  // timestamps
  public createdAt!: Date;

  public updatedAt!: Date;

  // MODEL ASSOCIATION METHODS
  // Order-OrderProduct
  public getOrder!: BelongsToGetAssociationMixin<Order>;

  // Suppliments-OrderProduct
  public getSuppliments!: BelongsToManyGetAssociationsMixin<Suppliment>;

  public hasSuppliment!: BelongsToManyHasAssociationMixin<Suppliment, string>;

  public hasSuppliments!: BelongsToManyHasAssociationsMixin<Suppliment, string>;

  public addSuppliment!: BelongsToManyAddAssociationMixin<Suppliment, string>;

  public addSuppliments!: BelongsToManyAddAssociationsMixin<Suppliment, string>;

  public removeSuppliment!: BelongsToManyRemoveAssociationMixin<
    Suppliment,
    string
  >;

  public removeSuppliments!: BelongsToManyRemoveAssociationsMixin<
    Suppliment,
    string
  >;

  // Product-OrderProduct
  public getProduct!: BelongsToGetAssociationMixin<Product>;

  public setProduct!: BelongsToSetAssociationMixin<Product, string>;

  // POSSIBLE INCLUSIONS FROM ASSOTIATIONS
  public readonly suppliments?: Suppliment[];

  public readonly product?: Product;

  public readonly orderProductSuppliments?: OrderProductSuppliment[];

  public static associations: {
    suppliments: Association<Suppliment, OrderProduct>;
    product: Association<Product, OrderProduct>;
    orderProductSuppliments: Association<OrderProductSuppliment, OrderProduct>;
  };
}
