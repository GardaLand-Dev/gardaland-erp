/* eslint-disable max-classes-per-file */
import {
  Model,
  Optional,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  BelongsToCreateAssociationMixin,
  Association,
} from 'sequelize';
// eslint-disable-next-line import/no-cycle
import { InvItem } from '../invItem/type';
// eslint-disable-next-line import/no-cycle
import { User } from '../../rbac/user/type';

export interface DamageAttributes {
  id: string;
  invItemId: string;
  quantity: number;
  note: string;
  createdBy: string;
}
export type DamageCreationAttributes = Optional<
  DamageAttributes,
  'id' | 'note'
>;
export class Damage extends Model<DamageAttributes, DamageCreationAttributes>
  implements DamageAttributes {
  public id!: string;

  public invItemId!: string;

  public quantity!: number;

  public note!: string;

  public createdBy!: string;

  // timestamps
  public createdAt!: Date;

  public updatedAt!: Date;

  // MODEL ASSOCIATION METHODS
  // InvItem-Damage
  public getInvItem!: BelongsToGetAssociationMixin<InvItem>;

  public setInvItem!: BelongsToSetAssociationMixin<InvItem, string>;

  public createInvItem!: BelongsToCreateAssociationMixin<InvItem>;

  // User-Damage
  public getUser!: BelongsToGetAssociationMixin<User>;

  public setUser!: BelongsToSetAssociationMixin<User, string>;

  // POSSIBLE INCLUSIONS FROM ASSOTIATIONS
  public readonly invItem?: InvItem;

  public readonly user?: User;

  public static associations: {
    invItem: Association<InvItem, Damage>;
    user: Association<User, Damage>;
  };
}
