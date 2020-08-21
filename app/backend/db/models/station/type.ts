/* eslint-disable max-classes-per-file */
import { Model, Optional } from 'sequelize';

export interface StationAttributes {
  id: string;
  name: string;
  printerIp: string;
}
export type StationCreationAttributes = Optional<StationAttributes, 'id'>;
export class Station extends Model<StationAttributes, StationCreationAttributes>
  implements StationAttributes {
  public id!: string;

  public name!: string;

  public printerIp!: string;

  // timestamps
  public createdAt!: Date;

  public updatedAt!: Date;

  // MODEL ASSOCIATION METHODS

  // POSSIBLE INCLUSIONS FROM ASSOTIATIONS

  // public static assotations: {
  // };
}
