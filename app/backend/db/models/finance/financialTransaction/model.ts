import { DataTypes, Sequelize, ModelCtor, UUIDV4 } from 'sequelize';
import { FinancialTransaction } from './type';

export default function FinancialTransactionFactory(
  sequelize: Sequelize
): ModelCtor<FinancialTransaction> {
  return sequelize.define('financialTransactions', {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    caisseValue: {
      type: DataTypes.NUMBER.UNSIGNED,
      allowNull: true,
    },
    value: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });
}
