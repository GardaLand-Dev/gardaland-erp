import {
  Model,
  // BelongsToGetAssociationMixin,
  // BelongsToSetAssociationMixin,
  // Association,
} from 'sequelize';

export interface ProductStockableAttributes {
  quantity: number;
  productId: string;
  stockableId: string;
}
export type ProductStockableCreationAttributes = ProductStockableAttributes;
export class ProductStockable
  extends Model<ProductStockableAttributes, ProductStockableCreationAttributes>
  implements ProductStockableAttributes {
  public productId!: string;

  public stockableId!: string;

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
  //   employee: Association<Employee, ProductStockable>;
  // };
}
