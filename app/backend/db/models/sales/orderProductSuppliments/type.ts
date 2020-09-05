import {
  Model,
  Association,
  // BelongsToGetAssociationMixin,
  // BelongsToSetAssociationMixin,
  // Association,
} from 'sequelize';
// eslint-disable-next-line import/no-cycle
import { Suppliment } from '../../products/suppliment/type';

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

  // POSSIBLE INCLUSIONS FROM ASSOTIATIONS
  public readonly suppliment?: Suppliment;

  public static associations: {
    // employee: Association<Employee, OrderProductSuppliment>;
    suppliment: Association<Suppliment, OrderProductSuppliment>;
  };
}
