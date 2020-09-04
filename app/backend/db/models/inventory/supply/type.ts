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
import { Supplier } from '../supplier/type';
import { User } from '../../rbac/user/type';

export interface SupplyAttributes {
  id: string;
  quantity: number;
  deliveredOn: Date;
  cost: number;
  supplierId: string;
  invItemId: string;
  toBeArchived: boolean;
  remaining: number;
  consumedOn: Date;
}
export type SupplyCreationAttributes = Optional<
  SupplyAttributes,
  'id' | 'deliveredOn' | 'toBeArchived' | 'remaining' | 'consumedOn'
>;
export class Supply extends Model<SupplyAttributes, SupplyCreationAttributes>
  implements SupplyAttributes {
  public id!: string;

  public quantity!: number;

  public deliveredOn!: Date;

  public cost!: number;

  public supplierId!: string;

  public invItemId!: string;

  public remaining!: number;

  public consumedOn!: Date | undefined;

  public toBeArchived!: boolean;

  // timestamps
  public createdAt!: Date;

  public updatedAt!: Date;

  // MODEL ASSOCIATION METHODS
  // InvItem-Supply
  public getInvItem!: BelongsToGetAssociationMixin<InvItem>;

  public setInvItem!: BelongsToSetAssociationMixin<InvItem, string>;

  public createInvItem!: BelongsToCreateAssociationMixin<InvItem>;

  // Supplier-Supply
  public getSupplier!: BelongsToGetAssociationMixin<Supplier>;

  public setSupplier!: BelongsToSetAssociationMixin<Supplier, string>;

  public createSuppliet!: BelongsToCreateAssociationMixin<Supplier>;

  // User-Supply
  public getUser!: BelongsToGetAssociationMixin<User>;

  public setUser!: BelongsToSetAssociationMixin<User, string>;

  // POSSIBLE INCLUSIONS FROM ASSOTIATIONS
  public readonly invItem?: InvItem;

  public readonly supplier?: Supplier;

  public readonly user?: User;

  public static associations: {
    invItem: Association<InvItem, Supply>;
    supplier: Association<Supplier, Supply>;
    user: Association<User, Supply>;
  };
}
