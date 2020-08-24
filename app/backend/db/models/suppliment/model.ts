import { DataTypes, Sequelize, ModelCtor, UUIDV4 } from 'sequelize';
import { Suppliment } from './type';

export default function SupplimentFactory(
  sequelize: Sequelize
): ModelCtor<Suppliment> {
  return sequelize.define('suppliments', {
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
      // TODO: Add validator : to be unique non archived
      // suppliment, do it also for product
    },
    quantity: {
      type: DataTypes.NUMBER.UNSIGNED,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    toBeArchived: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });
}
