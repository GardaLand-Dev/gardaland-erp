import { DataTypes, Sequelize, ModelCtor, UUIDV4 } from 'sequelize';
import { Station } from './type';

export default function StationFactory(
  sequelize: Sequelize
): ModelCtor<Station> {
  return sequelize.define('stations', {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    printerIp: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
  });
}
