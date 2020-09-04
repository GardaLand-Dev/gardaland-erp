import {
  Optional,
  Model,
  Association,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  BelongsToCreateAssociationMixin,
  BelongsToManyGetAssociationsMixin,
  BelongsToManyAddAssociationMixin,
  BelongsToManyAddAssociationsMixin,
  BelongsToManyRemoveAssociationMixin,
  BelongsToManyHasAssociationMixin,
  BelongsToManyCountAssociationsMixin,
  BelongsToManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
} from 'sequelize';
// eslint-disable-next-line import/no-cycle
import { Family } from '../family/type';
// eslint-disable-next-line import/no-cycle
import { Stockable } from '../../inventory/stockable/type';
// eslint-disable-next-line import/no-cycle
import { OrderProduct } from '../../sales/orderProducts/type';
import { ProductStockable } from '../productStockables/type';

export interface ProductAttributes {
  id: string;
  name: string;
  isComposed: boolean;
  priceTTC: number;
  tva: number;
  toBeArchived: boolean;
  maxQuantity: number;
}
export type ProductCreationAttributes = Optional<
  ProductAttributes,
  'id' | 'tva' | 'toBeArchived' | 'maxQuantity'
>;
export class Product extends Model<ProductAttributes, ProductCreationAttributes>
  implements ProductAttributes {
  public id!: string;

  public name!: string;

  public isComposed!: boolean;

  public priceTTC!: number;

  public tva!: number;

  public toBeArchived!: boolean;

  public maxQuantity!: number;

  // timestamps
  public createdAt!: Date;

  public updatedAt!: Date;

  // MODEL ASSOCATION METHODS
  // Product-Family
  public getFamily!: BelongsToGetAssociationMixin<Family>;

  public setFamily!: BelongsToSetAssociationMixin<Family, string>;

  public createFamily!: BelongsToCreateAssociationMixin<Family>;

  // Product-Stockable
  public getStockables!: BelongsToManyGetAssociationsMixin<Stockable>;

  public addStockable!: BelongsToManyAddAssociationMixin<Stockable, string>;

  public addStockables!: BelongsToManyAddAssociationsMixin<Stockable, string>;

  public removeStockable!: BelongsToManyRemoveAssociationMixin<
    Stockable,
    string
  >;

  public hasStockable!: BelongsToManyHasAssociationMixin<Stockable, string>;

  public countStockable!: BelongsToManyCountAssociationsMixin;

  public createStockable!: BelongsToManyCreateAssociationMixin<Stockable>;

  // Product-OrderProduct

  public getOrderProducts!: HasManyGetAssociationsMixin<OrderProduct>;

  // POSSIBLE INCLUSIONS FROM ASSOTIATIONS
  public readonly family?: Family;

  public readonly stockables?: Stockable[];

  public readonly OrderProducts?: OrderProduct[];

  public readonly productStockables?: ProductStockable[];

  public static associations: {
    family: Association<Family, Product>;
    stockables: Association<Stockable, Product>;
    orderProducts: Association<OrderProduct, Product>;
    productStockables: Association<ProductStockable, Product>;
  };
}
