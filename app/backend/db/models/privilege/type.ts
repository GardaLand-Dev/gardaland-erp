/* eslint-disable max-classes-per-file */
import { BuildOptions, Model } from 'sequelize';

export interface PrivilegeAttributes {
  id?: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface PrivilegeModel
  extends Model<PrivilegeAttributes>,
    PrivilegeAttributes {}
export class Privilege extends Model<PrivilegeModel, PrivilegeAttributes> {}
export type PrivilegeStatic = typeof Model & {
  // eslint-disable-next-line @typescript-eslint/ban-types
  new (values?: object, options?: BuildOptions): PrivilegeModel;
};
