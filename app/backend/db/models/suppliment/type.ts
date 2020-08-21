/* eslint-disable max-classes-per-file */
import { Model, Optional } from 'sequelize';

export interface SupplimentAttributes {
  id: string;
  name: string;
  quantity: number;
  date: Date;
  toBeArchived: boolean;
}
export type SupplimentCreationAttributes = Optional<
  SupplimentAttributes,
  'id' | 'toBeArchived'
>;
export class Suppliment
  extends Model<SupplimentAttributes, SupplimentCreationAttributes>
  implements SupplimentAttributes {
  public id!: string;

  public name!: string;

  public quantity!: number;

  public date!: Date;

  public toBeArchived!: boolean;

  // timestamps
  public createdAt!: Date;

  public updatedAt!: Date;

  // MODEL ASSOCIATION METHODS

  // POSSIBLE INCLUSIONS FROM ASSOTIATIONS

  // public static assotations: {
  // };
}
