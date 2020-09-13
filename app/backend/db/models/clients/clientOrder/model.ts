import { ModelCtor, Sequelize, DataTypes } from 'sequelize';
import { ClientOrder } from './type';

export default function ClientOrderFactory(
  sequilize: Sequelize
): ModelCtor<ClientOrder> {
  return sequilize.define('clientOrders', {
    orderId: {
      type: DataTypes.UUID,
      primaryKey: true,
      unique: false,
    },
    clientId: {
      type: DataTypes.UUID,
      primaryKey: true,
      unique: false,
    },
  });
}
