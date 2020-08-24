/* eslint-disable max-classes-per-file */
import {
  Model,
  Optional,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  Association,
} from 'sequelize';
// eslint-disable-next-line import/no-cycle
import { Employee } from '../employee/type';
import { User } from '../user/type';

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
  // Employee-Payroll
  public getEmployee!: BelongsToGetAssociationMixin<Employee>;

  public setEmployee!: BelongsToSetAssociationMixin<Employee, string>;

  // User-Payroll
  public getUser!: BelongsToGetAssociationMixin<User>;

  public setUser!: BelongsToSetAssociationMixin<User, string>;

  // POSSIBLE INCLUSIONS FROM ASSOTIATIONS
  public readonly employee?: Employee;

  public readonly user?: User;

  public static assotations: {
    employee: Association<Employee, Payroll>;
    user: Association<User, Payroll>;
  };
}
