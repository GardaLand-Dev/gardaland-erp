/* eslint-disable max-classes-per-file */
import {
  Model,
  Optional,
  HasManyAddAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  Association,
  // BuildOptions,
  HasManyAddAssociationsMixin,
} from 'sequelize';
// eslint-disable-next-line import/no-cycle
import { Role } from '../role/type';

export interface UserAttributes {
  id: number;
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}
export type UserCreationAttributes = Optional<
  UserAttributes,
  'id' | 'email' | 'phone'
>;
export class User extends Model<UserAttributes, UserCreationAttributes>
  implements UserCreationAttributes {
  public id!: number;

  public userName!: string;

  public password!: string;

  public firstName!: string;

  public lastName!: string;

  public email: string | undefined;

  public phone: string | undefined;

  //  timestamps
  public createdAt!: Date;

  public updatedAt!: Date;

  //  model association methods
  public getRoles!: HasManyGetAssociationsMixin<Role>;

  public addRole!: HasManyAddAssociationMixin<Role, number>;

  public addRoles!: HasManyAddAssociationsMixin<Role, number>;

  public hasRole!: HasManyHasAssociationMixin<Role, number>;

  public countRoles!: HasManyCountAssociationsMixin;

  public createRole!: HasManyCreateAssociationMixin<Role>;

  //  possible inclusion from assotiation
  public readonly roles?: Role[];

  public static associations: {
    roles: Association<User, Role>;
  };
}
// export interface UserModel extends Model<UserAttributes>, UserAttributes {}
// export type UserStatic = typeof Model & {
//   // eslint-disable-next-line @typescript-eslint/ban-types
//   new (values?: object, options?: BuildOptions): User;
// };
