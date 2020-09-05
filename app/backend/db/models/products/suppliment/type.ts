/* eslint-disable max-classes-per-file */
import {
  Model,
  Optional,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  BelongsToCreateAssociationMixin,
  Association,
  BelongsToManyGetAssociationsMixin,
} from 'sequelize';
// eslint-disable-next-line import/no-cycle
import { InvItem } from '../../inventory/invItem/type';
// eslint-disable-next-line import/no-cycle
import { OrderProduct } from '../../sales/orderProducts/type';

export interface SupplimentAttributes {
  id: string;
  name: string;
  price: number;
  quantity: number;
  toBeArchived: boolean;
  invItemId: string;
  inStock: number;
}
export type SupplimentCreationAttributes = Optional<
  SupplimentAttributes,
  'id' | 'toBeArchived' | 'inStock'
>;
export class Suppliment
  extends Model<SupplimentAttributes, SupplimentCreationAttributes>
  implements SupplimentAttributes {
  public id!: string;

  public name!: string;

  public price!: number;

  public quantity!: number;

  public toBeArchived!: boolean;

  public invItemId!: string;

  public inStock!: number;

  // timestamps
  public createdAt!: Date;

  public updatedAt!: Date;

  // MODEL ASSOCIATION METHODS
  // InvItem-Suppliment
  public getInvItem!: BelongsToGetAssociationMixin<InvItem>;

  public setInvItem!: BelongsToSetAssociationMixin<InvItem, string>;

  public createInvItem!: BelongsToCreateAssociationMixin<InvItem>;

  // OrderProduct-Suppliment
  public getOrderProduct!: BelongsToManyGetAssociationsMixin<OrderProduct>;

  // POSSIBLE INCLUSIONS FROM ASSOTIATIONS
  public readonly invItem?: InvItem;

  public readonly orderProducts?: OrderProduct[];

  public static associations: {
    invItem: Association<InvItem, Suppliment>;
    orderProducts: Association<OrderProduct, Suppliment>;
  };
}
