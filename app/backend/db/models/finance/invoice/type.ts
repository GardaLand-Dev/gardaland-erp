/* eslint-disable max-classes-per-file */
import {
  Model,
  Optional,
  Association,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
} from 'sequelize';
// eslint-disable-next-line import/no-cycle
import { User } from '../../rbac/user/type';
// eslint-disable-next-line import/no-cycle
import { Supplier } from '../../inventory/supplier/type';

export interface InvoiceAttributes {
  id: string;
  dueDate: Date;
  amount: number;
  supplierId: string;
  createdBy: string;
  isPaid: boolean;
  note: string;
  financialTransactionId: string;
}
export type InvoiceCreationAttributes = Optional<
  InvoiceAttributes,
  'id' | 'isPaid' | 'note' | 'financialTransactionId'
>;
export class Invoice extends Model<InvoiceAttributes, InvoiceCreationAttributes>
  implements InvoiceAttributes {
  public id!: string;

  public dueDate: Date;

  public amount!: number;

  public supplierId!: string;

  public createdBy!: string;

  public isPaid!: boolean;

  public note!: string | undefined;

  public financialTransactionId!: string;

  // timestamps
  public createdAt!: Date;

  public updatedAt!: Date;

  // MODEL ASSOCIATION METHODS
  // User-Invoice
  public getUser!: BelongsToGetAssociationMixin<User>;

  public setUser!: BelongsToSetAssociationMixin<User, string>;

  // Supplier-Invoice
  public getSupplier!: BelongsToGetAssociationMixin<Supplier>;

  public setSupplier!: BelongsToSetAssociationMixin<Supplier, string>;

  // POSSIBLE INCLUSIONS FROM ASSOTIATIONS
  public readonly user?: User;

  public readonly supplier?: Supplier;

  public static associations: {
    user: Association<User, Invoice>;
    supplier: Association<Supplier, Invoice>;
  };
}
