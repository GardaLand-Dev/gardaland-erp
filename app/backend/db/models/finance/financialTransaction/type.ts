/* eslint-disable max-classes-per-file */
import { Model, Optional } from 'sequelize';

export interface FinancialTransactionAttributes {
  id: string;
  transactionTypeId: number;
  value: number;
  caisseValue: number;
}
export type FinancialTransactionCreationAttributes = Optional<
  FinancialTransactionAttributes,
  'id' | 'caisseValue'
>;
export class FinancialTransaction
  extends Model<
    FinancialTransactionAttributes,
    FinancialTransactionCreationAttributes
  >
  implements FinancialTransactionAttributes {
  public id!: string;

  public transactionTypeId!: number;

  public value!: number;

  public caisseValue!: number;

  // timestamps
  public createdAt!: Date;

  public updatedAt!: Date;
}
