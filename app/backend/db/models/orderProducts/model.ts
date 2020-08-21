import { DataTypes, Sequelize, ModelCtor, UUIDV4 } from 'sequelize';
import { OrderProduct } from './type';

export default function OrderProductFactory(
  sequelize: Sequelize
): ModelCtor<OrderProduct> {
  return sequelize.define('OrderProducts', {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    note: {
      type: DataTypes.TEXT({ length: 'medium' }),
    },
  });
}
