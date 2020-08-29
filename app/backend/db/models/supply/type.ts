/* eslint-disable max-classes-per-file */
import {
  Model,
  Optional,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  BelongsToCreateAssociationMixin,
  Association,
} from 'sequelize';
// eslint-disable-next-line import/no-cycle
import { Stockable } from '../stockable/type';
// eslint-disable-next-line import/no-cycle
import { Supplier } from '../supplier/type';
import { User } from '../user/type';

export interface SupplyAttributes {
  id: string;
  quantity: number;
  price: number;
  deliveredOn: Date;
  supplierId: string;
  stockableId: string;
  toBeArchived: boolean;
}
export type SupplyCreationAttributes = Optional<
  SupplyAttributes,
  'id' | 'deliveredOn' | 'toBeArchived'
>;
export class Supply extends Model<SupplyAttributes, SupplyCreationAttributes>
  implements SupplyAttributes {
  public id!: string;

  public quantity!: number;

  public price!: number;

  public supplierId!: string;

  public stockableId!: string;

  public toBeArchived!: boolean;

  public deliveredOn!: Date;

  // timestamps
  public createdAt!: Date;

  public updatedAt!: Date;

  // MODEL ASSOCIATION METHODS
  // Stockable-Supply
  public getStockable!: BelongsToGetAssociationMixin<Stockable>;

  public setStockable!: BelongsToSetAssociationMixin<Stockable, string>;

  public createStockable!: BelongsToCreateAssociationMixin<Stockable>;

  // Supplier-Supply
  public getSupplier!: BelongsToGetAssociationMixin<Supplier>;

  public setSupplier!: BelongsToSetAssociationMixin<Supplier, string>;

  public createSuppliet!: BelongsToCreateAssociationMixin<Supplier>;

  // User-Supply
  public getUser!: BelongsToGetAssociationMixin<User>;

  public setUser!: BelongsToSetAssociationMixin<User, string>;

  // POSSIBLE INCLUSIONS FROM ASSOTIATIONS
  public readonly stockable?: Stockable;

  public readonly supplier?: Supplier;

  public readonly user?: User;

  public static assotations: {
    stockable: Association<Stockable, Supply>;
    supplier: Association<Supplier, Supply>;
    user: Association<User, Supply>;
  };
}
