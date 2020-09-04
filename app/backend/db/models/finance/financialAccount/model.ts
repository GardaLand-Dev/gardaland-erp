import { DataTypes, Sequelize, ModelCtor, UUIDV4 } from 'sequelize';
import { FinancialAccount } from './type';

export default function FinancialAccountFactory(
  sequelize: Sequelize
): ModelCtor<FinancialAccount> {
  return sequelize.define('financialAccounts', {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    value: {
      type: DataTypes.NUMBER.UNSIGNED,
      defaultValue: null,
    },
  });
}
