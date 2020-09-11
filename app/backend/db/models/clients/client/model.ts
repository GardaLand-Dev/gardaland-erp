import { ModelCtor, Sequelize, DataTypes, UUIDV4 } from 'sequelize';
import { Client } from './type';

export default function ClientFactory(sequilize: Sequelize): ModelCtor<Client> {
  return sequilize.define('clients', {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(320),
    },
    tel: {
      type: DataTypes.STRING(15),
    },
    lastOrder: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  });
}
