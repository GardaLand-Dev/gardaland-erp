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
// eslint-disable-next-line import/no-cycle
import { Privilege } from '../privilege/type';

export interface OperationAttributes {
  id: string;
  name: string;
}
export type OperationCreationAttributes = Optional<OperationAttributes, 'id'>;
export class Operation
  extends Model<OperationAttributes, OperationCreationAttributes>
  implements OperationAttributes {
  public id!: string;

  public name!: string;

  // timestamps
  public createdAt!: Date;

  public updatedAt!: Date;

  // model association methods
  //  Operation-Privilege
  public getPrivileges!: HasManyGetAssociationsMixin<Privilege>;

  public addPrivilege!: HasManyAddAssociationMixin<Privilege, string>;

  public hasPrivilege!: HasManyHasAssociationMixin<Privilege, string>;

  public countPrivilege!: HasManyCountAssociationsMixin;

  public createPrivilege!: HasManyCreateAssociationMixin<Privilege>;

  // possible inclusion from associations
  public readonly privileges?: Privilege[];

  public static associations: {
    privileges: Association<Operation, Privilege>;
  };
}
