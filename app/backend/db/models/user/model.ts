import { DataTypes, Sequelize, ModelCtor, UUIDV4 } from 'sequelize';
import { User } from './type';

export default function UserFactory(sequelize: Sequelize): ModelCtor<User> {
  return sequelize.define('users', {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    userName: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  });
}
