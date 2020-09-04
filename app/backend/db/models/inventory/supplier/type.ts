/* eslint-disable max-classes-per-file */
import {
  Model,
  Optional,
  HasManyGetAssociationsMixin,
  HasManyCreateAssociationMixin,
  Association,
  BelongsToManyGetAssociationsMixin,
  BelongsToManyHasAssociationMixin,
  BelongsToManyHasAssociationsMixin,
  BelongsToManyCountAssociationsMixin,
  HasManyCountAssociationsMixin,
} from 'sequelize';
// eslint-disable-next-line import/no-cycle
import { Supply } from '../supply/type';
// eslint-disable-next-line import/no-cycle
import { InvItem } from '../invItem/type';
// eslint-disable-next-line import/no-cycle
import { Invoice } from '../../finance/invoice/type';

export interface SupplierAttributes {
  id: string;
  name: string;
  tel?: string;
  address?: string;
}
export type SupplierCreationAttributes = Optional<
  SupplierAttributes,
  'id' | 'address' | 'tel'
>;
export class Supplier
  extends Model<SupplierAttributes, SupplierCreationAttributes>
  implements SupplierAttributes {
  public id!: string;

  public name!: string;

  public address: string | undefined;

  public tel: string | undefined;

  // timestamps
  public createdAt!: Date;

  public updatedAt!: Date;

  // MODEL ASSOCIATION METHODS

  // Supply-Supplier
  public getInvoices!: HasManyGetAssociationsMixin<Invoice>;

  public countInvoices!: HasManyCountAssociationsMixin;

  public createInvoice!: HasManyCreateAssociationMixin<Invoice>;

  // InvItem-Supplier
  public getInvItems!: BelongsToManyGetAssociationsMixin<InvItem>;

  public hasInvItem!: BelongsToManyHasAssociationMixin<InvItem, string>;

  public hasInvItems!: BelongsToManyHasAssociationsMixin<InvItem, string>;

  public countInvItems!: BelongsToManyCountAssociationsMixin;

  // POSSIBLE INCLUSIONS FROM ASSOTIATIONS
  public readonly supplies?: Supply[];

  public readonly invItems?: InvItem[];

  public static associations: {
    supplies: Association<Supply, Supplier>;
    invItems: Association<InvItem, Supplier>;
  };
}
