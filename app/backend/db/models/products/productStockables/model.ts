import { ModelCtor, Sequelize, DataTypes } from 'sequelize';
import { ProductStockable } from './type';
// import { Product } from '..';

export default function ProductStockableFactory(
  sequilize: Sequelize
): ModelCtor<ProductStockable> {
  return sequilize.define('product_stockables', {
    // productId: {
    //   type: DataTypes.UUID,
    //   allowNull: false,
    //   references: Product.ref
    // },
    // stockableId: {
    //   type: DataTypes.UUID,
    //   allowNull: false,
    // }
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
}
