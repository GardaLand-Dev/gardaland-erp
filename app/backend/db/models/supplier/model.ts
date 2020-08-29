import { DataTypes, Sequelize, ModelCtor, UUIDV4, Deferrable } from 'sequelize';
import { Supplier } from './type';

export default function SupplierFactory(
  sequelize: Sequelize
): ModelCtor<Supplier> {
  return sequelize.define('suppliers', {
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
      validate: {
        isAlpha: true,
      },
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    tel: {
      type: DataTypes.STRING(15),
      allowNull: true,
      validate: {
        is: /\d{9,10}$/i,
      },
    },
  });
}
