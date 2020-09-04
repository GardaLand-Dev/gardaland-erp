import {
  // Optional,
  Model,
  // BelongsToGetAssociationMixin,
  // BelongsToSetAssociationMixin,
  // Association,
} from 'sequelize';
// eslint-disable-next-line import/no-cycle

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
  // public getEmployee!: BelongsToGetAssociationMixin<Employee>;

  // public setEmployee!: BelongsToSetAssociationMixin<Employee, string>;

  // // POSSIBLE INCLUSIONS FROM ASSOTIATIONS
  // public readonly employee?: Employee;

  // public static associations: {
  //   employee: Association<Employee, ClientOrder>;
  // };
}
