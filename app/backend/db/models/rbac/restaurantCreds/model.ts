import { DataTypes, Sequelize, ModelCtor } from 'sequelize';
import { RestaurantCreds } from './type';

export default function RestaurantCredsFactory(
  sequelize: Sequelize
): ModelCtor<RestaurantCreds> {
  return sequelize.define('restaurantCreds', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    apikey: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hwid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
}
