import { DataTypes, Sequelize, ModelCtor, UUIDV4 } from 'sequelize';
import { Order } from './type';

export default function OrderFactory(sequelize: Sequelize): ModelCtor<Order> {
  return sequelize.define('orders', {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    num: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    modified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    canceled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    totalPrice: {
      type: DataTypes.NUMBER,
    },
  });
}
