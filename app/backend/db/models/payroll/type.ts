/* eslint-disable max-classes-per-file */
import { Model, Optional } from 'sequelize';

export interface PayrollAttributes {
  id: string;
  lateHours: number;
  overTime: number;
  workedDays: number;
  absentDays: number;
  amount: number;
}
export type PayrollCreationAttributes = Optional<PayrollAttributes, 'id'>;
export class Payroll extends Model<PayrollAttributes, PayrollCreationAttributes>
  implements PayrollAttributes {
  public id!: string;

  public lateHours!: number;

  public overTime!: number;

  public workedDays!: number;

  public absentDays!: number;

  public amount!: number;

  // timestamps
  public createdAt!: Date;

  public updatedAt!: Date;

  // MODEL ASSOCIATION METHODS

  // POSSIBLE INCLUSIONS FROM ASSOTIATIONS

  // public static assotations: {
  // };
}
