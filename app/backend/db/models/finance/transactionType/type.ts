/* eslint-disable max-classes-per-file */
import {
  Model,
  Optional,
  Association,
  HasManyGetAssociationsMixin,
} from 'sequelize';
import { FinancialTransaction } from '../financialTransaction/type';

export interface TransactionTypeAttributes {
  id: number;
  source: string;
  sign: string;
}
export type TransactionTypeCreationAttributes = Optional<
  TransactionTypeAttributes,
  'id'
>;
export class TransactionType
  extends Model<TransactionTypeAttributes, TransactionTypeCreationAttributes>
  implements TransactionTypeAttributes {
  public id!: number;

  public source!: string;

  public sign!: string;

  // timestamps
  public createdAt!: Date;

  public updatedAt!: Date;

  // MODEL ASSOCIATION METHODS
  // TransactionType-FinancialTransaction
  public getTransaction!: HasManyGetAssociationsMixin<FinancialTransaction>;

  // POSSIBLE INCLUSIONS FROM ASSOTIATIONS
  public readonly financialTransactions?: FinancialTransaction[];

  public static associations: {
    financialTransactions: Association<FinancialTransaction, TransactionType>;
  };
}
