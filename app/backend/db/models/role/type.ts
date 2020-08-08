/* eslint-disable max-classes-per-file */
import {
  BuildOptions,
  Model,
  Optional,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyHasAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  Association,
} from 'sequelize';
// eslint-disable-next-line import/no-cycle
import { User } from '../user/type';

// eslint-disable-next-line import/no-cycle
import { Privilege } from '../privilege/type';

export interface RoleAttributes {
  id: number;
  name: string;
}
export type RoleCreationAttributes = Optional<RoleAttributes, 'id'>;

export class Role extends Model<RoleCreationAttributes, RoleAttributes>
  implements RoleCreationAttributes {
  public id!: number;

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
export type RoleStatic = typeof Model & {
  // eslint-disable-next-line @typescript-eslint/ban-types
  new (values?: object, options?: BuildOptions): Role;
};

// export interface RoleModel extends Model<RoleAttributes>, RoleAttributes {}
