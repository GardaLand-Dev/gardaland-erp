/* eslint-disable max-classes-per-file */
import {
  Model,
  Optional,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyRemoveAssociationMixin,
  Association,
} from 'sequelize';
// eslint-disable-next-line import/no-cycle
import { Attendance } from '../attendance/type';
// eslint-disable-next-line import/no-cycle
import { Payroll } from '../payroll/type';
// eslint-disable-next-line import/no-cycle
import { Title } from '../title/type';
// eslint-disable-next-line import/no-cycle
import { Salary } from '../salary/type';

export interface EmployeeAttributes {
  id: string;
  firstName: string;
  lastName: string;
  tel?: string;
  address?: string;
  email?: string;
}
export type EmployeeCreationAttributes = Optional<
  EmployeeAttributes,
  'id' | 'email' | 'address' | 'tel'
>;
export class Employee
  extends Model<EmployeeAttributes, EmployeeCreationAttributes>
  implements EmployeeAttributes {
  public id!: string;

  public firstName!: string;

  public lastName!: string;

  public tel: string | undefined;

  public address: string | undefined;

  public email: string | undefined;

  // timestamps
  public createdAt!: Date;

  public updatedAt!: Date;

  // MODEL ASSOCIATION METHODS
  // Attendance-Employee
  public getAttendances!: HasManyGetAssociationsMixin<Attendance>;

  public addAttendance!: HasManyAddAssociationMixin<Attendance, string>;

  public addAttendances!: HasManyAddAssociationsMixin<Attendance, string>;

  public removeAttendance!: HasManyRemoveAssociationMixin<Attendance, string>;

  public createAttendance!: HasManyCreateAssociationMixin<Attendance>;

  public countAttendaces!: HasManyCountAssociationsMixin;

  // Payroll-Employee
  public getPayrolls!: HasManyGetAssociationsMixin<Payroll>;

  public addPayroll!: HasManyAddAssociationMixin<Payroll, string>;

  public addPayrolls!: HasManyAddAssociationsMixin<Payroll, string>;

  public removePayroll!: HasManyRemoveAssociationMixin<Payroll, string>;

  public createPayroll!: HasManyCreateAssociationMixin<Payroll>;

  public countPayroll!: HasManyCountAssociationsMixin;

  // Title-Employee
  public getTitle!: HasManyGetAssociationsMixin<Title>;

  public addTitle!: HasManyAddAssociationMixin<Title, string>;

  public addTitles!: HasManyAddAssociationsMixin<Title, string>;

  public removeTitle!: HasManyRemoveAssociationMixin<Title, string>;

  public createTitle!: HasManyCreateAssociationMixin<Title>;

  public countTitles!: HasManyCountAssociationsMixin;

  // Salary-Employee
  public getSalaries!: HasManyGetAssociationsMixin<Salary>;

  public addSalary!: HasManyAddAssociationMixin<Salary, string>;

  public addSalaries!: HasManyAddAssociationsMixin<Salary, string>;

  public removeSalary!: HasManyRemoveAssociationMixin<Salary, string>;

  public createSalary!: HasManyCreateAssociationMixin<Salary>;

  public countSalary!: HasManyCountAssociationsMixin;

  // POSSIBLE INCLUSIONS FROM ASSOTIATIONS
  public readonly attendences?: Attendance;

  public readonly payrolls?: Payroll;

  public readonly titles?: Title;

  public readonly salaries?: Salary;

  public static assotations: {
    attendences: Association<Attendance, Employee>;
    payrolls: Association<Payroll, Employee>;
    titles: Association<Title, Employee>;
    salaries: Association<Salary, Employee>;
  };
}
