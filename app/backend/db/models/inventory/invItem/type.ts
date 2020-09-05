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
import { Product } from '../../products/product/type';
// eslint-disable-next-line import/no-cycle
import { Suppliment } from '../../products/suppliment/type';
// eslint-disable-next-line import/no-cycle
import { Supply } from '../supply/type';
// eslint-disable-next-line import/no-cycle
import { Supplier } from '../supplier/type';

export interface InvItemAttributes {
  id: string;
  name: string;
  unit: string;
  isIngredient: boolean;
  inStock: number;
  alertQuantity: number;
}
export type InvItemCreationAttributes = Optional<
  InvItemAttributes,
  'id' | 'inStock'
>;
export class InvItem extends Model<InvItemAttributes, InvItemCreationAttributes>
  implements InvItemAttributes {
  public id!: string;

  public name!: string;

  public unit!: string;

  public isIngredient!: boolean;

  public inStock!: number;

  public alertQuantity!: number;

  // timestamps
  public createdAt!: Date;

  public updatedAt!: Date;

  // MODEL ASSOCIATION METHODS
  // Product-InvItem
  public getProducts!: BelongsToManyGetAssociationsMixin<Product>;

  public hasProduct!: BelongsToManyHasAssociationMixin<Product, string>;

  public hasProducts!: BelongsToManyHasAssociationsMixin<Product, string>;

  public countProducts!: BelongsToManyCountAssociationsMixin;

  // Suppliment-InvItem
  public getSuppliments!: HasManyGetAssociationsMixin<Suppliment>;

  public hasSuppliment!: HasManyHasAssociationMixin<Suppliment, string>;

  public hasSuppliments!: HasManyHasAssociationsMixin<Suppliment, string>;

  public countSuppliments!: HasManyCountAssociationsMixin;

  // Supply-InvItem
  public getSupplies!: HasManyGetAssociationsMixin<Supply>;

  // Supplier-InvItem
  public getSuppliers!: BelongsToManyGetAssociationsMixin<Supplier>;

  public hasSupplier!: BelongsToManyHasAssociationMixin<Supplier, string>;

  public hasSuppliers!: BelongsToManyHasAssociationsMixin<Supplier, string>;

  public countSuppliers!: BelongsToManyCountAssociationsMixin;

  // POSSIBLE INCLUSIONS FROM ASSOTIATIONS
  public readonly products?: Product[];

  public readonly suppliments?: Suppliment[];

  public readonly supplies?: Supply[];

  public readonly suppliers?: Supplier[];

  public static associations: {
    products: Association<Product, InvItem>;
    suppliments: Association<Suppliment, InvItem>;
    supplies: Association<Supply, InvItem>;
    suppliers: Association<Supplier, InvItem>;
  };
}
