import { DataTypes, Sequelize, UUIDV4, ModelCtor } from 'sequelize';
import { Resource } from './type';

export default function ResourceFactory(
  sequelize: Sequelize
): ModelCtor<Resource> {
  return sequelize.define('resources', {
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
    // subject: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
  });
}
