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
    deliveredOn: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    cost: {
      type: DataTypes.NUMBER.UNSIGNED,
      allowNull: false,
    },
    remaining: {
      type: DataTypes.NUMBER.UNSIGNED,
      allowNull: true,
      defaultValue: null,
    },
    consumedOn: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    toBeArchived: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  });
}
