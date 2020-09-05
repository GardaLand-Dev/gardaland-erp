/* eslint-disable max-classes-per-file */
import {
  Model,
  Optional,
  HasManyAddAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  Association,
  // BuildOptions,
  HasManyAddAssociationsMixin,
  HasManyRemoveAssociationMixin,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  BelongsToCreateAssociationMixin,
} from 'sequelize';
// eslint-disable-next-line import/no-cycle
import { Role } from '../role/type';
// eslint-disable-next-line import/no-cycle
import { Employee } from '../../humanResources/employee/type';

export interface UserAttributes {
  id: string;
  userName: string;
  password: string;
  employeeId: string;
}
export type UserCreationAttributes = Optional<
  UserAttributes,
  'id' | 'employeeId'
>;
export class User extends Model<UserAttributes, UserCreationAttributes>
  implements UserCreationAttributes {
  public id!: string;

  public userName!: string;

  public password!: string;

  public employeeId!: string;

  //  timestamps
  public createdAt!: Date;

  public updatedAt!: Date;

  //  model association methods
  // user-roles
  public getRoles!: HasManyGetAssociationsMixin<Role>;

  public addRole!: HasManyAddAssociationMixin<Role, string>;

  public addRoles!: HasManyAddAssociationsMixin<Role, string>;

  public removeRole!: HasManyRemoveAssociationMixin<Role, string>;

  public hasRole!: HasManyHasAssociationMixin<Role, string>;

  public countRoles!: HasManyCountAssociationsMixin;

  public createRole!: HasManyCreateAssociationMixin<Role>;

  // user-employee
  public getEmployee!: BelongsToGetAssociationMixin<Employee>;

  public setEmployee!: BelongsToSetAssociationMixin<Employee, string>;

  public createEmployee!: BelongsToCreateAssociationMixin<Employee>;

  //  possible inclusion from assotiation
  public readonly roles?: Role[];

  public readonly employee?: Employee;

  public static associations: {
    roles: Association<User, Role>;
    employee: Association<Employee, User>;
  };
}
// export interface UserModel extends Model<UserAttributes>, UserAttributes {}
// export type UserStatic = typeof Model & {
//   // eslint-disable-next-line @typescript-eslint/ban-types
//   new (values?: object, options?: BuildOptions): User;
// };
