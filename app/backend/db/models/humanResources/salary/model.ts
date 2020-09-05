import { DataTypes, Sequelize, ModelCtor, UUIDV4 } from 'sequelize';
import { Salary } from './type';

export default function SalaryFactory(sequelize: Sequelize): ModelCtor<Salary> {
  return sequelize.define('salaries', {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    hourlyRate: {
      type: DataTypes.NUMBER.UNSIGNED,
      allowNull: false,
    },
    amount: {
      type: DataTypes.NUMBER.UNSIGNED,
      allowNull: false,
    },
    from: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    to: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  });
}
