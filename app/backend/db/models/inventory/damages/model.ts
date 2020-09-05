import { DataTypes, Sequelize, ModelCtor, UUIDV4 } from 'sequelize';
import { Damage } from './type';

export default function DamageFactory(sequelize: Sequelize): ModelCtor<Damage> {
  return sequelize.define('damages', {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.NUMBER.UNSIGNED,
      allowNull: false,
    },
    note: {
      type: DataTypes.STRING(300),
      allowNull: true,
    },
  });
}
