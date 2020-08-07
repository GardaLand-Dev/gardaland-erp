/* eslint-disable max-classes-per-file */
import { BuildOptions, Model } from 'sequelize';

export interface ResourceAttributes {
  id?: number;
  name: string;
  subject: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface ResourceModel
  extends Model<ResourceAttributes>,
    ResourceAttributes {}
export class Resource extends Model<ResourceModel, ResourceAttributes> {}
export type ResourceStatic = typeof Model & {
  // eslint-disable-next-line @typescript-eslint/ban-types
  new (values?: object, options?: BuildOptions): ResourceModel;
};
