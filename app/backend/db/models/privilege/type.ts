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
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  BelongsToCreateAssociationMixin,
} from 'sequelize';
// eslint-disable-next-line import/no-cycle
import { Role } from '../role/type';
// eslint-disable-next-line import/no-cycle
import { Resource } from '../Resource/type';
// eslint-disable-next-line import/no-cycle
import { Operation } from '../operation/type';

export interface PrivilegeAttributes {
  id: number;
  name: string;
}
export type PrivilegeCreationAttributes = Optional<PrivilegeAttributes, 'id'>;
export class Privilege
  extends Model<PrivilegeAttributes, PrivilegeCreationAttributes>
  implements PrivilegeAttributes {
  public id!: number;

  public name!: string;

  // timestamps
  public createdAt!: Date;

  public updatedAt!: Date;

  // MODEL ASSOCIATION METHODS
  //  Privilege-Role
  public getRoles!: HasManyGetAssociationsMixin<Role>;

  public addRole!: HasManyAddAssociationMixin<Role, number>;

  public hasRole!: HasManyHasAssociationMixin<Role, number>;

  public countRole!: HasManyCountAssociationsMixin;

  public createRole!: HasManyCreateAssociationMixin<Role>;

  //  Privilege-Resource
  public getResource!: BelongsToGetAssociationMixin<Resource>;

  public setResource!: BelongsToSetAssociationMixin<Resource, number>;

  public createResource!: BelongsToCreateAssociationMixin<Resource>;

  //  Privilege-Operation
  public getOperation!: BelongsToGetAssociationMixin<Operation>;

  public setOperation!: BelongsToSetAssociationMixin<Operation, number>;

  public createOperation!: BelongsToCreateAssociationMixin<Operation>;

  // POSSIBLE INCLUSIONS FROM ASSOTIATIONS
  public readonly role?: Role[];

  public readonly operation?: Operation;

  public readonly Resource?: Resource;

  // public re

  public static assotations: {
    Roles: Association<Role, Privilege>;
  };
}
export type PrivilegeStatic = typeof Model & {
  // eslint-disable-next-line @typescript-eslint/ban-types
  new (values?: object, options?: BuildOptions): Privilege;
};
