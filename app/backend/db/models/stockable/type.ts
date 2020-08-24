/* eslint-disable max-classes-per-file */
import {
  Model,
  Optional,
  BelongsToManyGetAssociationsMixin,
  BelongsToManyHasAssociationMixin,
  BelongsToManyHasAssociationsMixin,
  BelongsToManyCountAssociationsMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyHasAssociationsMixin,
  HasManyCountAssociationsMixin,
  Association,
} from 'sequelize';
// eslint-disable-next-line import/no-cycle
import { Product } from '../product/type';
// eslint-disable-next-line import/no-cycle
import { Suppliment } from '../suppliment/type';
// eslint-disable-next-line import/no-cycle
import { Supply } from '../supply/type';
// eslint-disable-next-line import/no-cycle
import { Supplier } from '../supplier/type';

export interface StockableAttributes {
  id: string;
  name: string;
  unit: string;
  isIngredient: boolean;
  quantity: number;
  alertQuantity: number;
}
export type StockableCreationAttributes = Optional<
  StockableAttributes,
  'id' | 'quantity'
>;
export class Stockable
  extends Model<StockableAttributes, StockableCreationAttributes>
  implements StockableAttributes {
  public id!: string;

  public name!: string;

  public unit!: string;

  public isIngredient!: boolean;

  public quantity!: number;

  public alertQuantity!: number;

  // timestamps
  public createdAt!: Date;

  public updatedAt!: Date;

  // MODEL ASSOCIATION METHODS
  // Product-Stockable
  public getProducts!: BelongsToManyGetAssociationsMixin<Product>;

  public hasProduct!: BelongsToManyHasAssociationMixin<Product, string>;

  public hasProducts!: BelongsToManyHasAssociationsMixin<Product, string>;

  public countProducts!: BelongsToManyCountAssociationsMixin;

  // Suppliment-Stockable
  public getSuppliments!: HasManyGetAssociationsMixin<Suppliment>;

  public hasSuppliment!: HasManyHasAssociationMixin<Suppliment, string>;

  public hasSuppliments!: HasManyHasAssociationsMixin<Suppliment, string>;

  public countSuppliments!: HasManyCountAssociationsMixin;

  // Supply-Stockable
  public getSupplies!: HasManyGetAssociationsMixin<Supply>;

  // Supplier-Stockable
  public getSuppliers!: BelongsToManyGetAssociationsMixin<Supplier>;

  public hasSupplier!: BelongsToManyHasAssociationMixin<Supplier, string>;

  public hasSuppliers!: BelongsToManyHasAssociationsMixin<Supplier, string>;

  public countSuppliers!: BelongsToManyCountAssociationsMixin;

  // POSSIBLE INCLUSIONS FROM ASSOTIATIONS
  public readonly products?: Product[];

  public readonly suppliments?: Suppliment[];

  public readonly supplies?: Supply[];

  public readonly suppliers?: Supplier[];

  public static assotations: {
    products: Association<Product, Stockable>;
    suppliments: Association<Suppliment, Stockable>;
    supplies: Association<Supply, Stockable>;
    suppliers: Association<Supplier, Stockable>;
  };
}
