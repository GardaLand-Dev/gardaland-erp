/* eslint-disable max-classes-per-file */
import {
  Model,
  Optional,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManyRemoveAssociationMixin,
  HasManyHasAssociationMixin,
  HasManyHasAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyCountAssociationsMixin,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  BelongsToCreateAssociationMixin,
  Association,
} from 'sequelize';
// eslint-disable-next-line import/no-cycle
import { Product } from '../product/type';
// eslint-disable-next-line import/no-cycle
import { Station } from '../station/type';

export interface FamilyAttributes {
  id: string;
  name: string;
  stationId: string;
}
export type FamilyCreationAttributes = Optional<
  FamilyAttributes,
  'id' | 'stationId'
>;
export class Family extends Model<FamilyAttributes, FamilyCreationAttributes>
  implements FamilyAttributes {
  public id!: string;

  public name!: string;

  public stationId!: string | undefined;

  // timestamps
  public createdAt!: Date;

  public updatedAt!: Date;

  // MODEL ASSOCIATION METHODS
  // Family-Product
  public getProducts!: HasManyGetAssociationsMixin<Product>;

  public addProduct!: HasManyAddAssociationMixin<Product, string>;

  public addProducts!: HasManyAddAssociationsMixin<Product, string>;

  public removeProduct!: HasManyRemoveAssociationMixin<Product, string>;

  public hasProduct!: HasManyHasAssociationMixin<Product, string>;

  public hasProducts!: HasManyHasAssociationsMixin<Product, string>;

  public countProducts!: HasManyCountAssociationsMixin;

  public createProduct!: HasManyCreateAssociationMixin<Product>;

  // Family-Station
  public getStation!: BelongsToGetAssociationMixin<Station>;

  public setStation!: BelongsToSetAssociationMixin<Station, string>;

  public createStation!: BelongsToCreateAssociationMixin<Station>;

  // POSSIBLE INCLUSIONS FROM ASSOTIATIONS
  public readonly products?: Product[];

  public readonly station?: Station;

  public static associations: {
    products: Association<Product, Family>;
    station: Association<Station, Family>;
  };
}
