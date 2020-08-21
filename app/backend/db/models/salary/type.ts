/* eslint-disable max-classes-per-file */
import { Model, Optional } from 'sequelize';

export interface SalaryAttributes {
  id: string;
  hourlyRate: number;
  amount: number;
  from: Date;
  to: Date;
}
export type SalaryCreationAttributes = Optional<SalaryAttributes, 'id'>;
export class Salary extends Model<SalaryAttributes, SalaryCreationAttributes>
  implements SalaryAttributes {
  public id!: string;

  public hourlyRate!: number;

  public amount!: number;

  public from!: Date;

  public to!: Date;

  // timestamps
  public createdAt!: Date;

  public updatedAt!: Date;

  // MODEL ASSOCIATION METHODS

  // POSSIBLE INCLUSIONS FROM ASSOTIATIONS

  // public static assotations: {
  // };
}
