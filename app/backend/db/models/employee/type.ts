/* eslint-disable max-classes-per-file */
import { Model, Optional } from 'sequelize';

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

  // POSSIBLE INCLUSIONS FROM ASSOTIATIONS

  // public static assotations: {
  // };
}
