import {
  Model,
  // BelongsToGetAssociationMixin,
  // BelongsToSetAssociationMixin,
  // Association,
} from 'sequelize';

export interface OrderProductSupplimentAttributes {
  quantity: number;
  orderProductId: string;
  supplimentId: string;
}
export type OrderProductSupplimentCreationAttributes = OrderProductSupplimentAttributes;
export class OrderProductSuppliment
  extends Model<
    OrderProductSupplimentAttributes,
    OrderProductSupplimentCreationAttributes
  >
  implements OrderProductSupplimentAttributes {
  public orderProductId!: string;

  public supplimentId!: string;

  public quantity!: number;

  // timestamps
  public createdAt!: Date;

  public updatedAt!: Date;

  // MODEL ASSOCATION METHODS
  // public getEmployee!: BelongsToGetAssociationMixin<Employee>;

  // public setEmployee!: BelongsToSetAssociationMixin<Employee, string>;

  // // POSSIBLE INCLUSIONS FROM ASSOTIATIONS
  // public readonly employee?: Employee;

  // public static associations: {
  //   employee: Association<Employee, OrderProductSuppliment>;
  // };
}
