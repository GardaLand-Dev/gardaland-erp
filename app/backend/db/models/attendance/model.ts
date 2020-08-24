import { ModelCtor, Sequelize, DataTypes, UUIDV4 } from 'sequelize';
import { Attendance } from './type';

export default function AttendanceFactory(
  sequilize: Sequelize
): ModelCtor<Attendance> {
  return sequilize.define('attendances', {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    checkIn: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    checkOut: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    dayDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  });
}
