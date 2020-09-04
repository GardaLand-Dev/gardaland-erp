import { DataTypes, Sequelize, ModelCtor, UUIDV4 } from 'sequelize';
import { Expense } from './type';

export default function ExpenseFactory(
  sequelize: Sequelize
): ModelCtor<Expense> {
  return sequelize.define('expenses', {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    amount: {
      type: DataTypes.NUMBER.UNSIGNED,
      allowNull: false,
    },
  });
}
