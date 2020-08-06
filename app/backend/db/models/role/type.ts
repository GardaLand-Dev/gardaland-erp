/* eslint-disable max-classes-per-file */
import { BuildOptions, Model } from 'sequelize';

export interface RoleAttributes {
  id?: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface RoleModel extends Model<RoleAttributes>, RoleAttributes {}
export class Role extends Model<RoleModel, RoleAttributes> {}
export type RoleStatic = typeof Model & {
  // eslint-disable-next-line @typescript-eslint/ban-types
  new (values?: object, options?: BuildOptions): RoleModel;
};
