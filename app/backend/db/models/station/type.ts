/* eslint-disable max-classes-per-file */
import {
  Model,
  Optional,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyHasAssociationsMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  Association,
} from 'sequelize';
// eslint-disable-next-line import/no-cycle
import { Family } from '../family/type';

export interface StationAttributes {
  id: string;
  name: string;
  printer: string;
}
export type StationCreationAttributes = Optional<StationAttributes, 'id'>;
export class Station extends Model<StationAttributes, StationCreationAttributes>
  implements StationAttributes {
  public id!: string;

  public name!: string;

  public printer!: string;

  // timestamps
  public createdAt!: Date;

  public updatedAt!: Date;

  // MODEL ASSOCIATION METHODS
  // Family-Station
  public getFamilies!: HasManyGetAssociationsMixin<Family>;

  public createFamily!: HasManyCreateAssociationMixin<Family>;

  public hasFamily!: HasManyHasAssociationMixin<Family, string>;

  public hasFamilies!: HasManyHasAssociationsMixin<Family, string>;

  public countFamilies!: HasManyCountAssociationsMixin;

  // POSSIBLE INCLUSIONS FROM ASSOTIATIONS
  public readonly families?: Family[];

  public static assotations: {
    families: Association<Family, Station>;
  };
}
