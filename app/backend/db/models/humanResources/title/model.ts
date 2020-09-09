import { DataTypes, Sequelize, ModelCtor, UUIDV4 } from 'sequelize';
import { Title } from './type';

export default function TitleFactory(sequelize: Sequelize): ModelCtor<Title> {
  return sequelize.define('titles', {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    from: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    to: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
  });
}
