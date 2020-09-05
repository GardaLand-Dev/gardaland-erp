import { ModelCtor, Sequelize, DataTypes } from 'sequelize';
import { OrderProductSuppliment } from './type';
// import { Product } from '..';

export default function OrderProductSupplimentFactory(
  sequilize: Sequelize
): ModelCtor<OrderProductSuppliment> {
  return sequilize.define('order_product_suppliments', {
    // productId: {
    //   type: DataTypes.UUID,
    //   allowNull: false,
    //   references: Product.ref
    // },
    // invItemId: {
    //   type: DataTypes.UUID,
    //   allowNull: false,
    // }
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
}
