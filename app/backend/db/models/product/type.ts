import { Optional, Model } from 'sequelize';

export interface ProductAttributes {
  id: string;
  name: string;
  isComposed: boolean;
  priceTTC: number;
  tva: number;
  toBeArchived: boolean;
}
export type ProductCreationAttributes = Optional<
  ProductAttributes,
  'id' | 'tva' | 'toBeArchived'
>;
export class Product extends Model<ProductAttributes, ProductCreationAttributes>
  implements ProductAttributes {
  public id!: string;

  public name!: string;

  public isComposed!: boolean;

  public priceTTC!: number;

  public tva!: number;

  public toBeArchived!: boolean;

  // timestamps
  public createdAt!: Date;

  public updatedAt!: Date;

  // MODEL ASSOCATION METHODS

  // POSSIBLE INCLUSIONS FROM ASSOTIATIONS
}
