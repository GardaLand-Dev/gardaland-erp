import { DataTypes, Sequelize, ModelCtor } from 'sequelize';
import { TransactionType } from './type';

export default function TransactionTypeFactory(
  sequelize: Sequelize
): ModelCtor<TransactionType> {
  return sequelize.define('transactionTypes', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    source: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    sign: {
      type: DataTypes.ENUM('POS', 'NEG'),
      allowNull: false,
    },
  });
}
