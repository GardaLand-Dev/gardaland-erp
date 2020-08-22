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
  id: string;
  userName: string;
  password: string;
}
export type UserCreationAttributes = Optional<UserAttributes, 'id'>;
export class User extends Model<UserAttributes, UserCreationAttributes>
  implements UserCreationAttributes {
  public id!: string;

  public userName!: string;

  public password!: string;

  //  timestamps
  public createdAt!: Date;

  public updatedAt!: Date;

  //  model association methods
  public getRoles!: HasManyGetAssociationsMixin<Role>;

  public addRole!: HasManyAddAssociationMixin<Role, string>;

  public addRoles!: HasManyAddAssociationsMixin<Role, string>;

  public hasRole!: HasManyHasAssociationMixin<Role, string>;

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
