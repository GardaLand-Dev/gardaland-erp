import { DataTypes, Sequelize } from 'sequelize';
import { RoleStatic } from './type';

export default function RoleFactory(sequelize: Sequelize): RoleStatic {
  return <RoleStatic>sequelize.define('roles', {
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
