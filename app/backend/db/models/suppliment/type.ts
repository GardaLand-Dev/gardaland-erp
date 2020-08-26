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
import { Stockable } from '../stockable/type';
// eslint-disable-next-line import/no-cycle
import { OrderProduct } from '../orderProducts/type';

export interface SupplimentAttributes {
  id: string;
  name: string;
  quantity: number;
  toBeArchived: boolean;
  stockableId: string;
}
export type SupplimentCreationAttributes = Optional<
  SupplimentAttributes,
  'id' | 'toBeArchived'
>;
export class Suppliment
  extends Model<SupplimentAttributes, SupplimentCreationAttributes>
  implements SupplimentAttributes {
  public id!: string;

  public name!: string;

  public quantity!: number;

  public toBeArchived!: boolean;

  public stockableId!: string;

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

  public static assotations: {
    stockable: Association<Stockable, Suppliment>;
    orderProducts: Association<OrderProduct, Suppliment>;
  };
}
