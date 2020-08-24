import { DataTypes, Sequelize, UUIDV4, ModelCtor } from 'sequelize';
import { Role } from './type';

export default function RoleFactory(sequelize: Sequelize): ModelCtor<Role> {
  return sequelize.define('roles', {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false,
    },
  });
}
