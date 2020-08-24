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
  id: string;
  name: string;
  resourceId: string;
  operationId: string;
}
export type PrivilegeCreationAttributes = Optional<PrivilegeAttributes, 'id'>;
export class Privilege
  extends Model<PrivilegeAttributes, PrivilegeCreationAttributes>
  implements PrivilegeAttributes {
  public id!: string;

  public name!: string;

  // timestamps
  public createdAt!: Date;

  public updatedAt!: Date;

  // Foreign Keys
  public resourceId!: string;

  public operationId!: string;

  // MODEL ASSOCIATION METHODS
  //  Privilege-Role
  public getRoles!: HasManyGetAssociationsMixin<Role>;

  public addRole!: HasManyAddAssociationMixin<Role, string>;

  public hasRole!: HasManyHasAssociationMixin<Role, string>;

  public countRole!: HasManyCountAssociationsMixin;

  public createRole!: HasManyCreateAssociationMixin<Role>;

  //  Privilege-Resource
  public getResource!: BelongsToGetAssociationMixin<Resource>;

  public setResource!: BelongsToSetAssociationMixin<Resource, string>;

  public createResource!: BelongsToCreateAssociationMixin<Resource>;

  //  Privilege-Operation
  public getOperation!: BelongsToGetAssociationMixin<Operation>;

  public setOperation!: BelongsToSetAssociationMixin<Operation, string>;

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
