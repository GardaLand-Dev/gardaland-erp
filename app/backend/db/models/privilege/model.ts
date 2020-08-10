import { DataTypes, Sequelize, ModelCtor, UUIDV4 } from 'sequelize';
import { Privilege } from './type';

export default function PrivilegeFactory(
  sequelize: Sequelize
): ModelCtor<Privilege> {
  return sequelize.define('privileges', {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });
}
