import { DataTypes, Sequelize } from 'sequelize';
import { ResourceStatic } from './type';

export default function ResourceFactory(sequelize: Sequelize): ResourceStatic {
  return <ResourceStatic>sequelize.define('resources', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true, // use auto gen
      primaryKey: true,
    },
    name: {
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
