import { DataTypes, Sequelize } from 'sequelize';
import { OperationStatic } from './type';

export default function OperationFactory(
  sequelize: Sequelize
): OperationStatic {
  return <OperationStatic>sequelize.define('operations', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true, // use auto gen
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    action: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  });
}
