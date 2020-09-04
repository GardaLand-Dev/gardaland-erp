/* eslint-disable max-classes-per-file */
import {
  Model,
  Optional,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  Association,
  BelongsToCreateAssociationMixin,
} from 'sequelize';
// eslint-disable-next-line import/no-cycle
import { Employee } from '../employee/type';
// eslint-disable-next-line import/no-cycle
import { User } from '../../rbac/user/type';
import { FinancialTransaction } from '../../finance/financialTransaction/type';

export interface PayrollAttributes {
  id: string;
  lateHours: number;
  overTime: number;
  workedDays: number;
  absentDays: number;
  amount: number;
  financialTransactionId: string;
  createdBy: string;
}
export type PayrollCreationAttributes = Optional<
  PayrollAttributes,
  'id' | 'financialTransactionId'
>;
export class Payroll extends Model<PayrollAttributes, PayrollCreationAttributes>
  implements PayrollAttributes {
  public id!: string;

  public lateHours!: number;

  public overTime!: number;

  public workedDays!: number;

  public absentDays!: number;

  public amount!: number;

  public financialTransactionId!: string;

  public createdBy!: string;

  // timestamps
  public createdAt!: Date;

  public updatedAt!: Date;

  // MODEL ASSOCIATION METHODS
  // Employee-Payroll
  public getEmployee!: BelongsToGetAssociationMixin<Employee>;

  public setEmployee!: BelongsToSetAssociationMixin<Employee, string>;

  // FT-payroll
  public getFinancialTransaction!: BelongsToGetAssociationMixin<
    FinancialTransaction
  >;

  public setFinancialTransaction!: BelongsToSetAssociationMixin<
    FinancialTransaction,
    string
  >;

  public createFinancialTransaction!: BelongsToCreateAssociationMixin<
    FinancialTransaction
  >;

  // User-Payroll
  public getUser!: BelongsToGetAssociationMixin<User>;

  public setUser!: BelongsToSetAssociationMixin<User, string>;

  // POSSIBLE INCLUSIONS FROM ASSOTIATIONS
  public readonly employee?: Employee;

  public readonly user?: User;

  public static associations: {
    employee: Association<Employee, Payroll>;
    user: Association<User, Payroll>;
  };
}
