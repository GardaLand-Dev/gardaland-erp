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
  // Employee-Salary
  public getEmployee!: BelongsToGetAssociationMixin<Employee>;

  public setEmployee!: BelongsToSetAssociationMixin<Employee, string>;

  // POSSIBLE INCLUSIONS FROM ASSOTIATIONS
  public readonly employee?: Employee;

  public static associations: {
    employee: Association<Employee, Salary>;
  };
}
