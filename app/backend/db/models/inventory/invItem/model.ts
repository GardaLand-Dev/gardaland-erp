import { DataTypes, Sequelize, ModelCtor, UUIDV4 } from 'sequelize';
import { InvItem } from './type';

export default function InvItemFactory(
  sequelize: Sequelize
): ModelCtor<InvItem> {
  return sequelize.define('invItems', {
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
    inStock: {
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
