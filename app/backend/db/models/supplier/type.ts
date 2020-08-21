/* eslint-disable max-classes-per-file */
import { Model, Optional } from 'sequelize';

export interface SupplierAttributes {
  id: string;
  name: string;
  tel?: string;
  address?: string;
}
export type SupplierCreationAttributes = Optional<
  SupplierAttributes,
  'id' | 'address' | 'tel'
>;
export class Supplier
  extends Model<SupplierAttributes, SupplierCreationAttributes>
  implements SupplierAttributes {
  public id!: string;

  public name!: string;

  public address: string | undefined;

  public tel: string | undefined;

  // timestamps
  public createdAt!: Date;

  public updatedAt!: Date;

  // MODEL ASSOCIATION METHODS

  // POSSIBLE INCLUSIONS FROM ASSOTIATIONS

  // public static assotations: {
  // };
}
