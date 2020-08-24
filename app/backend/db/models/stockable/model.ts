import { DataTypes, Sequelize, ModelCtor, UUIDV4 } from 'sequelize';
import { Stockable } from './type';

export default function StockableFactory(
  sequelize: Sequelize
): ModelCtor<Stockable> {
  return sequelize.define('stockables', {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    unit: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    isIngredient: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    quantity: {
      type: DataTypes.NUMBER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    alertQuantity: {
      type: DataTypes.NUMBER.UNSIGNED,
      allowNull: false,
    },
  });
}
