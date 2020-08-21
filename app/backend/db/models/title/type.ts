/* eslint-disable max-classes-per-file */
import { Model, Optional } from 'sequelize';

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

  // POSSIBLE INCLUSIONS FROM ASSOTIATIONS

  // public static assotations: {
  // };
}
