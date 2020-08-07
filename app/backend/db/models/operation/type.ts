/* eslint-disable max-classes-per-file */
import { BuildOptions, Model } from 'sequelize';

export interface OperationAttributes {
  id?: number;
  name: string;
  action: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface OperationModel
  extends Model<OperationAttributes>,
    OperationAttributes {}
export class Operation extends Model<OperationModel, OperationAttributes> {}
export type OperationStatic = typeof Model & {
  // eslint-disable-next-line @typescript-eslint/ban-types
  new (values?: object, options?: BuildOptions): OperationModel;
};
