/* eslint-disable import/no-cycle */
import {
  Model,
  // BelongsToGetAssociationMixin,
  // BelongsToSetAssociationMixin,
  Association,
} from 'sequelize';
import { InvItem } from '../../inventory/invItem/type';
import { Product } from '../product/type';

export interface ProductInvItemAttributes {
  quantity: number;
  productId: string;
  invItemId: string;
}
export type ProductInvItemCreationAttributes = ProductInvItemAttributes;
export class ProductInvItem
  extends Model<ProductInvItemAttributes, ProductInvItemCreationAttributes>
  implements ProductInvItemAttributes {
  public productId!: string;

  public invItemId!: string;

  public quantity!: number;

  // timestamps
  public createdAt!: Date;

  public updatedAt!: Date;

  // MODEL ASSOCATION METHODS

  // public getEmployee!: BelongsToGetAssociationMixin<Employee>;

  // public setEmployee!: BelongsToSetAssociationMixin<Employee, string>;

  // POSSIBLE INCLUSIONS FROM ASSOTIATIONS
  // public readonly employee?: Employee;
  public readonly invItem?: InvItem;

  public readonly product?: Product;

  public static associations: {
    invItem: Association<InvItem, ProductInvItem>;
    product: Association<Product, ProductInvItem>;
  };
}
