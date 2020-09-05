/* eslint-disable max-classes-per-file */
import {
  Model,
  Optional,
  Association,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
} from 'sequelize';

import { User } from '../../rbac/user/type';

export interface ExpenseAttributes {
  id: string;
  amount: number;
  createdBy: string;
  financialTransactionId: string;
}
export type ExpenseCreationAttributes = Optional<
  ExpenseAttributes,
  'id' | 'financialTransactionId'
>;
export class Expense extends Model<ExpenseAttributes, ExpenseCreationAttributes>
  implements ExpenseAttributes {
  public id!: string;

  public amount!: number;

  public createdBy!: string;

  public financialTransactionId!: string;

  // timestamps
  public createdAt!: Date;

  public updatedAt!: Date;

  // MODEL ASSOCIATION METHODS
  // User-Expense
  public getUser!: BelongsToGetAssociationMixin<User>;

  public setUser!: BelongsToSetAssociationMixin<User, string>;

  // POSSIBLE INCLUSIONS FROM ASSOTIATIONS
  public readonly user?: User;

  public static associations: {
    user: Association<User, Expense>;
  };
}
