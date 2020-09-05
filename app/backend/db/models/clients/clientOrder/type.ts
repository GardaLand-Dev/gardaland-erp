import {
  // Optional,
  Model,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  Association,
} from 'sequelize';
import { Order } from '../../sales/order/type';
// eslint-disable-next-line import/no-cycle
import { Client } from '../client/type';

export interface ClientOrderAttributes {
  orderId: string;
  clientId: string;
}
// export type ClientOrderCreationAttributes = Optional<
//   ClientOrderAttributes,
//   'id' | 'checkOut'
// >;
export class ClientOrder
  extends Model<ClientOrderAttributes, ClientOrderAttributes>
  implements ClientOrderAttributes {
  public orderId!: string;

  public clientId!: string;

  // timestamps
  public createdAt!: Date;

  public updatedAt!: Date;

  // MODEL ASSOCATION METHODS
  public getOrder!: BelongsToGetAssociationMixin<Order>;

  public setOrder!: BelongsToSetAssociationMixin<Order, string>;

  public getClient!: BelongsToGetAssociationMixin<Client>;

  public setClient!: BelongsToSetAssociationMixin<Client, string>;

  // POSSIBLE INCLUSIONS FROM ASSOTIATIONS
  public readonly order?: Order;

  public readonly client?: Client;

  public static associations: {
    order: Association<Order, ClientOrder>;
    client: Association<Client, ClientOrder>;
  };
}
