import { DataTypes, Sequelize, ModelCtor, UUIDV4 } from 'sequelize';
import { Payroll } from './type';

export default function PayrollFactory(
  sequelize: Sequelize
): ModelCtor<Payroll> {
  return sequelize.define('payrolls', {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    lateHours: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    overTime: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    workedDays: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    absentDays: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      type: DataTypes.NUMBER.UNSIGNED,
      allowNull: false,
    },
  });
}
