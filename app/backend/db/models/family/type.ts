/* eslint-disable max-classes-per-file */
import { Model, Optional } from 'sequelize';

export interface FamilyAttributes {
  id: string;
  name: string;
}
export type FamilyCreationAttributes = Optional<FamilyAttributes, 'id'>;
export class Family extends Model<FamilyAttributes, FamilyCreationAttributes>
  implements FamilyAttributes {
  public id!: string;

  public name!: string;

  // timestamps
  public createdAt!: Date;

  public updatedAt!: Date;

  // MODEL ASSOCIATION METHODS

  // POSSIBLE INCLUSIONS FROM ASSOTIATIONS

  // public static assotations: {
  // };
}
