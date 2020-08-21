/* eslint-disable max-classes-per-file */
import {
  Model,
  Optional,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyHasAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  Association,
  HasManyAddAssociationsMixin,
} from 'sequelize';
// eslint-disable-next-line import/no-cycle
import { User } from '../user/type';

// eslint-disable-next-line import/no-cycle
import { Privilege } from '../privilege/type';

export interface RoleAttributes {
  id: string;
  name: string;
}
export type RoleCreationAttributes = Optional<RoleAttributes, 'id'>;

export class Role extends Model<RoleAttributes, RoleCreationAttributes>
  implements RoleCreationAttributes {
  public id!: string;

  public name!: string;

  // timestamps
  public createdAt!: Date;

  public updatedAt!: Date;

  // model association methods
  //  Role-User
  public getUsers!: HasManyGetAssociationsMixin<User>;

  public addUser!: HasManyAddAssociationMixin<User, number>;

  public hasUser!: HasManyHasAssociationMixin<User, number>;

  public countUser!: HasManyCountAssociationsMixin;

  public createUser!: HasManyCreateAssociationMixin<User>;

  //  Role-Privilege
  public getPrivileges!: HasManyGetAssociationsMixin<Privilege>;

  public addPrivilege!: HasManyAddAssociationMixin<Privilege, number>;

  public addPrivileges!: HasManyAddAssociationsMixin<Privilege, number>;

  public hasPrivilege!: HasManyHasAssociationMixin<Privilege, number>;

  public countPrivilege!: HasManyCountAssociationsMixin;

  public createPrivilege!: HasManyCreateAssociationMixin<Privilege>;

  // possible inclusion from assotations
  public readonly users?: User[];

  public readonly privileges?: Privilege[];

  public static assotations: {
    users: Association<Role, User>;
    privileges: Association<Role, Privilege>;
  };
}
export type RoleStatic = typeof Role;

// export interface RoleModel extends Model<RoleAttributes>, RoleAttributes {}
