/* eslint-disable max-classes-per-file */
import {
  Model,
  Optional,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  Association,
} from 'sequelize';
// eslint-disable-next-line import/no-cycle
import { Employee } from '../employee/type';

export interface TitleAttributes {
  id: string;
  name: string;
  from: Date;
  to: Date;
}
export type TitleCreationAttributes = Optional<TitleAttributes, 'id'>;
export class Title extends Model<TitleAttributes, TitleCreationAttributes>
  implements TitleAttributes {
  public id!: string;

  public name!: string;

  public from!: Date;

  public to: Date;

  // timestamps
  public createdAt!: Date;

  public updatedAt!: Date;

  // MODEL ASSOCIATION METHODS
  // Employee-Title
  public getEmployee!: BelongsToGetAssociationMixin<Employee>;

  public setEmployee!: BelongsToSetAssociationMixin<Employee, string>;

  // POSSIBLE INCLUSIONS FROM ASSOTIATIONS
  public readonly employee?: Employee;

  public static associations: {
    employee: Association<Employee, Title>;
  };
}
