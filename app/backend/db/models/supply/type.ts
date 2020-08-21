/* eslint-disable max-classes-per-file */
import { Model, Optional } from 'sequelize';

export interface SupplyAttributes {
  id: string;
  quantity: number;
  price: number;
  deliveredOn: Date;
}
export type SupplyCreationAttributes = Optional<SupplyAttributes, 'id'>;
export class Supply extends Model<SupplyAttributes, SupplyCreationAttributes>
  implements SupplyAttributes {
  public id!: string;

  public quantity!: number;

  public price!: number;

  public deliveredOn!: Date;

  // timestamps
  public createdAt!: Date;

  public updatedAt!: Date;

  // MODEL ASSOCIATION METHODS

  // POSSIBLE INCLUSIONS FROM ASSOTIATIONS

  // public static assotations: {
  // };
}
