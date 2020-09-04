import { Request, Response } from 'express';
import { FindOptions, Includeable } from 'sequelize/types';
import { AttendanceCreationAttributes } from '../../../db/models/humanResources/attendance/type';
import {
  successResponse,
  dbError,
  insufficientParameters,
  failureResponse,
} from '../../common/service';
import { DEFAULT_LIMIT, Attendance, Employee } from '../../../db/models';

export default class AttendanceController {
  public static createAttendance(req: Request, res: Response) {
    if (
      req.body.employeeId &&
      typeof req.body.employeeId === 'string' &&
      req.body.checkOut &&
      req.body.dayDate
    ) {
      const attendanceParams: AttendanceCreationAttributes = {
        employeeId: req.body.employeeId,
        checkIn: req.body.checkIn,
        dayDate: req.body.dayDate,
      };
      if (req.body.checkOut) attendanceParams.checkOut = req.body.checkOut;
      Attendance.create(attendanceParams)
        .then((attendanceData) =>
          successResponse('create attendance successfull', attendanceData, res)
        )
        .catch((err) => dbError(err, res));
    } else {
      insufficientParameters(res);
    }
  }

  public static getAttendance(req: Request, res: Response) {
    if (req.query.id && typeof req.query.id === 'string') {
      const filter = { id: req.query.id };
      const attendanceFilter = { where: filter };
      Attendance.findOne(attendanceFilter)
        .then((attendanceData) =>
          successResponse('get attendance successfull', attendanceData, res)
        )
        .catch((err) => dbError(err, res));
    } else {
      insufficientParameters(res);
    }
  }

  public static updateAttendance(req: Request, res: Response) {
    if (req.body.id && typeof req.body.id === 'string') {
      const filter = { id: req.body.id };
      const attendanceFilter = { where: filter };
      Attendance.findOne(attendanceFilter)
        .then(async (attendanceData) => {
          if (!attendanceData) throw new Error("couldn't find attendance");
          const attendanceParams: AttendanceCreationAttributes = {
            checkIn: req.body.checkIn
              ? req.body.checkIn
              : attendanceData.checkIn,
            checkOut: req.body.checkOut
              ? req.body.checkOut
              : attendanceData.checkOut,
            dayDate: req.body.dayDate
              ? req.body.dayDate
              : attendanceData.dayDate,
            employeeId: req.body.employeeId
              ? req.body.employeeId
              : attendanceData.employeeId,
          };
          attendanceData.setAttributes(attendanceParams);
          return attendanceData.save();
        })
        .then((attendanceData) =>
          successResponse('attendance update sucessful', attendanceData, res)
        )
        .catch((err) => dbError(err, res));
    } else {
      insufficientParameters(res);
    }
  }

  // TODO: you may need to activate paranoid or custom isdeleted scope
  public static deleteAttendance(req: Request, res: Response) {
    if (req.body.id) {
      const attendanceFilter = { where: { id: req.body.id } };
      Attendance.findOne(attendanceFilter)
        .then((attendanceData) => {
          return attendanceData.destroy();
        })
        .catch((err) => dbError(err, res));
    } else {
      insufficientParameters(res);
    }
  }

  public static getAttendances(req: Request, res: Response) {
    const limit =
      typeof req.query.limit === 'number' && req.query.limit > 0
        ? req.query.limit
        : DEFAULT_LIMIT;
    const offset =
      typeof req.query.page === 'number' && req.query.page > 0
        ? (req.query.page - 1) * limit
        : 0;
    const options: FindOptions<import('../../../db/models/humanResources/attendance/type').Attendance> = {
      limit,
      offset,
      include: [],
    };
    if (req.query.incEmployee === 'true')
      (<Includeable[]>options.include).push({ model: Employee });
    if (typeof req.query.employeeId === 'string' && req.query.employeeId)
      options.where = { id: req.query.employeeId };
    // if (req.query.ingredient === 'true') options.where = { isIngredient: true };
    Attendance.findAll(options)
      .then((attendancesData) =>
        successResponse('Attendances retrieved', attendancesData, res)
      )
      .catch((err) =>
        failureResponse('couldnt retrieve Attendances', err, res)
      );
  }
}
