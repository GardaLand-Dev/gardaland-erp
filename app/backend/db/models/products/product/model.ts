import { ModelCtor, Sequelize, DataTypes, UUIDV4 } from 'sequelize';
import { Product } from './type';

export default function ProductFactory(
  sequilize: Sequelize
): ModelCtor<Product> {
  return sequilize.define('products', {
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
    isComposed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    priceTTC: {
      type: DataTypes.NUMBER.UNSIGNED,
      allowNull: false,
    },
    tva: {
      type: DataTypes.NUMBER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    toBeArchived: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    maxQuantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });
}
