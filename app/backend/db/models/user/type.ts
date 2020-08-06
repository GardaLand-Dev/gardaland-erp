/* eslint-disable max-classes-per-file */
import { BuildOptions, Model } from 'sequelize';

export interface UserAttributes {
  id: number;
  firstName: string;
  LastName: string;
  email: string;
  phone: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface UserModel extends Model<UserAttributes>, UserAttributes {}
export class User extends Model<UserModel, UserAttributes> {}
export type UserStatic = typeof Model & {
  // eslint-disable-next-line @typescript-eslint/ban-types
  new (values?: object, options?: BuildOptions): UserModel;
};
