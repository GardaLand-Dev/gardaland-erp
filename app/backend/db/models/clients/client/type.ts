import {
  Optional,
  Model,
  Association,
  HasManyGetAssociationsMixin,
  HasManyCountAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManyRemoveAssociationMixin,
  HasManyCreateAssociationMixin,
} from 'sequelize';
// eslint-disable-next-line import/no-cycle
import { ClientOrder } from '../clientOrder/type';
// eslint-disable-next-line import/no-cycle

export interface ClientAttributes {
  id: string;
  firstname: string;
  lastname: string;
  tel?: string;
  email?: string;
  lastOrder: Date;
}
export type ClientCreationAttributes = Optional<
  ClientAttributes,
  'id' | 'email' | 'tel' | 'lastOrder'
>;
export class Client extends Model<ClientAttributes, ClientCreationAttributes>
  implements ClientAttributes {
  public id!: string;

  public firstname!: string;

  public lastname!: string;

  public tel!: string | undefined;

  public email!: string | undefined;

  public lastOrder!: Date;

  // timestamps
  public createdAt!: Date;

  public updatedAt!: Date;

  // MODEL ASSOCATION METHODS
  public getClientOrders!: HasManyGetAssociationsMixin<ClientOrder>;

  public countClientOrders!: HasManyCountAssociationsMixin;

  public addClientOrder!: HasManyAddAssociationMixin<ClientOrder, string>;

  public addClientOrders!: HasManyAddAssociationsMixin<ClientOrder, string>;

  public removeClientOrder!: HasManyRemoveAssociationMixin<ClientOrder, string>;

  public createClientOrder!: HasManyCreateAssociationMixin<ClientOrder>;

  // POSSIBLE INCLUSIONS FROM ASSOTIATIONS
  public readonly clientOrder?: ClientOrder;

  public static associations: {
    clientOrder?: Association<ClientOrder, Client>;
  };
}
