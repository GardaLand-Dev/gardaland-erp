import { DataTypes, Sequelize, ModelCtor, UUIDV4 } from 'sequelize';
import { Employee } from './type';

export default function EmployeeFactory(
  sequelize: Sequelize
): ModelCtor<Employee> {
  return sequelize.define('employees', {
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
    address: {
      type: DataTypes.STRING(255),
    },
    email: {
      type: DataTypes.STRING(320),
    },
    tel: {
      type: DataTypes.STRING(15),
    },
  });
}
