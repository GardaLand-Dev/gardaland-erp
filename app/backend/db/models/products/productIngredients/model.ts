import { ModelCtor, Sequelize, DataTypes } from 'sequelize';
import { ProductInvItem } from './type';
// import { Product } from '..';

export default function ProductInvItemFactory(
  sequilize: Sequelize
): ModelCtor<ProductInvItem> {
  return sequilize.define('product_invItems', {
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
