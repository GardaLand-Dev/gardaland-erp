/* eslint-disable max-classes-per-file */
import { Model, Optional } from 'sequelize';

export interface StockableAttributes {
  id: string;
  name: string;
  unit: string;
  isIngredient: boolean;
  quantity: number;
  alertQuantity: number;
}
export type StockableCreationAttributes = Optional<StockableAttributes, 'id'>;
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

  // POSSIBLE INCLUSIONS FROM ASSOTIATIONS

  // public static assotations: {
  // };
}
