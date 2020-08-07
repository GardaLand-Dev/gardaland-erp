import { DataTypes, Sequelize } from 'sequelize';
import { PrivilegeStatic } from './type';

export default function PrivilegeFactory(
  sequelize: Sequelize
): PrivilegeStatic {
  return <PrivilegeStatic>sequelize.define('privileges', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true, // use auto gen
      primaryKey: true,
    },
    name: {
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
