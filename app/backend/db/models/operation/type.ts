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
import { Privilege } from '../privilege/type';

export interface OperationAttributes {
  id: number;
  name: string;
}
export type OperationCreationAttributes = Optional<OperationAttributes, 'id'>;
export class Operation
  extends Model<OperationAttributes, OperationCreationAttributes>
  implements OperationAttributes {
  public id!: number;

  public name!: string;

  // timestamps
  public createdAt!: Date;

  public updatedAt!: Date;

  // model association methods
  //  Operation-Privilege
  public getPrivileges!: HasManyGetAssociationsMixin<Privilege>;

  public addPrivilege!: HasManyAddAssociationMixin<Privilege, number>;

  public hasPrivilege!: HasManyHasAssociationMixin<Privilege, number>;

  public countPrivilege!: HasManyCountAssociationsMixin;

  public createPrivilege!: HasManyCreateAssociationMixin<Privilege>;

  // possible inclusion from assotations
  public readonly privileges?: Privilege[];

  public static assotations: {
    privileges: Association<Operation, Privilege>;
  };
}
