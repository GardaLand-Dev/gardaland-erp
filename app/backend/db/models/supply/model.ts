import { DataTypes, Sequelize, ModelCtor, UUIDV4 } from 'sequelize';
import { Supply } from './type';

export default function SupplyFactory(sequelize: Sequelize): ModelCtor<Supply> {
  return sequelize.define('supplying', {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.NUMBER.UNSIGNED,
      allowNull: false,
    },
    price: {
      type: DataTypes.NUMBER.UNSIGNED,
      allowNull: false,
    },
    deliveredOn: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  });
}
