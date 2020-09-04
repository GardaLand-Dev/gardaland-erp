/* eslint-disable max-classes-per-file */
import { Model, Optional } from 'sequelize';
// eslint-disable-next-line import/no-cycle

export interface FinancialAccountAttributes {
  id: string;
  value: number;
}
export type FinancialAccountCreationAttributes = Optional<
  FinancialAccountAttributes,
  'id' | 'value'
>;
export class FinancialAccount
  extends Model<FinancialAccountAttributes, FinancialAccountCreationAttributes>
  implements FinancialAccountAttributes {
  public id!: string;

  public value!: number;

  // timestamps
  public createdAt!: Date;

  public updatedAt!: Date;
}
