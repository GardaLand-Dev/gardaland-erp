import { DataTypes, Sequelize, ModelCtor, UUIDV4 } from 'sequelize';
import { Family } from './type';

export default function FamilyFactory(sequelize: Sequelize): ModelCtor<Family> {
  return sequelize.define('families', {
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
  });
}
