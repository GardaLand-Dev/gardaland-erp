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
// eslint-disable-next-line import/no-cycle
import { Invoice } from '../../finance/invoice/type';

export interface SupplyAttributes {
  id: string;
  quantity: number;
  deliveredOn: Date;
  cost: number;
  invItemId: string;
  toBeArchived: boolean;
  remaining: number;
  consumedOn: Date;
  invoiceId: string;
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

  public invItemId!: string;

  public remaining!: number;

  public consumedOn!: Date | undefined;

  public toBeArchived!: boolean;

  public invoiceId!: string;

  // timestamps
  public createdAt!: Date;

  public updatedAt!: Date;

  // MODEL ASSOCIATION METHODS
  // InvItem-Supply
  public getInvItem!: BelongsToGetAssociationMixin<InvItem>;

  public setInvItem!: BelongsToSetAssociationMixin<InvItem, string>;

  public createInvItem!: BelongsToCreateAssociationMixin<InvItem>;

  // Supplier-Supply
  public getInvoice!: BelongsToGetAssociationMixin<Invoice>;

  public setInvoice!: BelongsToSetAssociationMixin<Invoice, string>;

  public createInvoice!: BelongsToCreateAssociationMixin<Invoice>;

  // POSSIBLE INCLUSIONS FROM ASSOTIATIONS
  public readonly invItem?: InvItem;

  public readonly supplier?: Supplier;

  public static associations: {
    invItem: Association<InvItem, Supply>;
    supplier: Association<Supplier, Supply>;
  };
}
