import {
  Optional,
  Model,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  Association,
} from 'sequelize';
// eslint-disable-next-line import/no-cycle
import { Employee } from '../employee/type';

export interface AttendanceAttributes {
  id: string;
  checkIn: Date;
  checkOut: Date;
  dayDate: Date;
  employeeId: string;
}
export type AttendanceCreationAttributes = Optional<
  AttendanceAttributes,
  'id' | 'checkOut'
>;
export class Attendance
  extends Model<AttendanceAttributes, AttendanceCreationAttributes>
  implements AttendanceAttributes {
  public id!: string;

  public checkIn!: Date;

  public checkOut!: Date;

  public dayDate!: Date;

  public employeeId!: string;

  // timestamps
  public createdAt!: Date;

  public updatedAt!: Date;

  // MODEL ASSOCATION METHODS
  public getEmployee!: BelongsToGetAssociationMixin<Employee>;

  public setEmployee!: BelongsToSetAssociationMixin<Employee, string>;

  // POSSIBLE INCLUSIONS FROM ASSOTIATIONS
  public readonly employee?: Employee;

  public static associations: {
    employee: Association<Employee, Attendance>;
  };
}
