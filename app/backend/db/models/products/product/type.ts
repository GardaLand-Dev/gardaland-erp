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
import { InvItem } from '../../inventory/invItem/type';
// eslint-disable-next-line import/no-cycle
import { OrderProduct } from '../../sales/orderProducts/type';
// eslint-disable-next-line import/no-cycle
import { ProductInvItem } from '../productIngredients/type';

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

  // Product-InvItem
  public getInvItems!: BelongsToManyGetAssociationsMixin<InvItem>;

  public addInvItem!: BelongsToManyAddAssociationMixin<InvItem, string>;

  public addInvItems!: BelongsToManyAddAssociationsMixin<InvItem, string>;

  public removeInvItem!: BelongsToManyRemoveAssociationMixin<InvItem, string>;

  public hasInvItem!: BelongsToManyHasAssociationMixin<InvItem, string>;

  public countInvItem!: BelongsToManyCountAssociationsMixin;

  public createInvItem!: BelongsToManyCreateAssociationMixin<InvItem>;

  // Product-OrderProduct

  public getOrderProducts!: HasManyGetAssociationsMixin<OrderProduct>;

  // POSSIBLE INCLUSIONS FROM ASSOTIATIONS
  public readonly family?: Family;

  public readonly invItems?: InvItem[];

  public readonly OrderProducts?: OrderProduct[];

  public readonly productInvItems?: ProductInvItem[];

  public static associations: {
    family: Association<Family, Product>;
    invItems: Association<InvItem, Product>;
    orderProducts: Association<OrderProduct, Product>;
    productInvItems: Association<ProductInvItem, Product>;
  };
}
