/* eslint-disable max-classes-per-file */
import {
  Model,
  Optional,
  HasManyGetAssociationsMixin,
  HasManyCreateAssociationMixin,
  Association,
  BelongsToManyGetAssociationsMixin,
  BelongsToManyHasAssociationMixin,
  BelongsToManyHasAssociationsMixin,
  BelongsToManyCountAssociationsMixin,
} from 'sequelize';
// eslint-disable-next-line import/no-cycle
import { Supply } from '../supply/type';
// eslint-disable-next-line import/no-cycle
import { Stockable } from '../stockable/type';

export interface SupplierAttributes {
  id: string;
  name: string;
  tel?: string;
  address?: string;
}
export type SupplierCreationAttributes = Optional<
  SupplierAttributes,
  'id' | 'address' | 'tel'
>;
export class Supplier
  extends Model<SupplierAttributes, SupplierCreationAttributes>
  implements SupplierAttributes {
  public id!: string;

  public name!: string;

  public address: string | undefined;

  public tel: string | undefined;

  // timestamps
  public createdAt!: Date;

  public updatedAt!: Date;

  // MODEL ASSOCIATION METHODS
  // Supply-Supplier
  public getSupplies!: HasManyGetAssociationsMixin<Supply>;

  public createSupply!: HasManyCreateAssociationMixin<Supply>;

  // Stockable-Supplier
  public getStockables!: BelongsToManyGetAssociationsMixin<Stockable>;

  public hasStockable!: BelongsToManyHasAssociationMixin<Stockable, string>;

  public hasStockables!: BelongsToManyHasAssociationsMixin<Stockable, string>;

  public countStockables!: BelongsToManyCountAssociationsMixin;

  // POSSIBLE INCLUSIONS FROM ASSOTIATIONS
  public readonly supplies?: Supply[];

  public readonly stockables?: Stockable[];

  public static assotations: {
    supplies: Association<Supply, Supplier>;
    stockables: Association<Stockable, Supplier>;
  };
}
