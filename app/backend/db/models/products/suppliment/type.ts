/* eslint-disable max-classes-per-file */
import {
  Model,
  Optional,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  BelongsToCreateAssociationMixin,
  Association,
  BelongsToManyGetAssociationsMixin,
} from 'sequelize';
// eslint-disable-next-line import/no-cycle
import { Stockable } from '../../inventory/stockable/type';
// eslint-disable-next-line import/no-cycle
import { OrderProduct } from '../../sales/orderProducts/type';

export interface SupplimentAttributes {
  id: string;
  name: string;
  price: number;
  quantity: number;
  toBeArchived: boolean;
  stockableId: string;
  inStock: number;
}
export type SupplimentCreationAttributes = Optional<
  SupplimentAttributes,
  'id' | 'toBeArchived' | 'inStock'
>;
export class Suppliment
  extends Model<SupplimentAttributes, SupplimentCreationAttributes>
  implements SupplimentAttributes {
  public id!: string;

  public name!: string;

  public price!: number;

  public quantity!: number;

  public toBeArchived!: boolean;

  public stockableId!: string;

  public inStock!: number;

  // timestamps
  public createdAt!: Date;

  public updatedAt!: Date;

  // MODEL ASSOCIATION METHODS
  // Stockable-Suppliment
  public getStockable!: BelongsToGetAssociationMixin<Stockable>;

  public setStockable!: BelongsToSetAssociationMixin<Stockable, string>;

  public createStockable!: BelongsToCreateAssociationMixin<Stockable>;

  // OrderProduct-Suppliment
  public getOrderProduct!: BelongsToManyGetAssociationsMixin<OrderProduct>;

  // POSSIBLE INCLUSIONS FROM ASSOTIATIONS
  public readonly stockable?: Stockable;

  public readonly orderProducts?: OrderProduct[];

  public static associations: {
    stockable: Association<Stockable, Suppliment>;
    orderProducts: Association<OrderProduct, Suppliment>;
  };
}
