import { Optional, Model } from 'sequelize';

export interface AttendanceAttributes {
  id: string;
  checkIn: Date;
  checkOut: Date;
  dayDate: Date;
}
export type AttendanceCreationAttributes = Optional<AttendanceAttributes, 'id'>;
export class Attendance
  extends Model<AttendanceAttributes, AttendanceCreationAttributes>
  implements AttendanceAttributes {
  public id!: string;

  public checkIn!: Date;

  public checkOut!: Date;

  public dayDate!: Date;

  // timestamps
  public createdAt!: Date;

  public updatedAt!: Date;

  // MODEL ASSOCATION METHODS

  // POSSIBLE INCLUSIONS FROM ASSOTIATIONS
}
