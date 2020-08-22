/* eslint-disable import/no-cycle */
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
} from 'sequelize';
import { Privilege } from '../privilege/type';

export interface ResourceAttributes {
  id: string;
  name: string;
}
export type ResourceCreationAttributes = Optional<ResourceAttributes, 'id'>;
export class Resource
  extends Model<ResourceAttributes, ResourceCreationAttributes>
  implements ResourceAttributes {
  public id!: string;

  public name!: string;

  // timestamps
  public createdAt!: Date;

  public updatedAt!: Date;

  // model association methods
  //  Resource-Privilege
  public getPrivileges!: HasManyGetAssociationsMixin<Privilege>;

  public addPrivilege!: HasManyAddAssociationMixin<Privilege, string>;

  public hasPrivilege!: HasManyHasAssociationMixin<Privilege, string>;

  public countPrivilege!: HasManyCountAssociationsMixin;

  public createPrivilege!: HasManyCreateAssociationMixin<Privilege>;

  // possible inclusion from assotations
  public readonly privileges?: Privilege[];

  public static assotations: {
    privileges: Association<Resource, Privilege>;
  };
}
export type ResourceStatic = typeof Resource;
