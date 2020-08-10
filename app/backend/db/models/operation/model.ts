import { DataTypes, Sequelize, ModelCtor, UUIDV4 } from 'sequelize';
import { Operation } from './type';

export default function OperationFactory(
  sequelize: Sequelize
): ModelCtor<Operation> {
  return sequelize.define('operations', {
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
    // action: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
  });
}
