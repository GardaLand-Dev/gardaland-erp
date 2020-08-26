// import { Request, Response } from 'express';
// import {
//   AttendanceCreationAttributes,
//   Attendance,
// } from '../../../db/models/attendance/type';
// import {
//   successResponse,
//   dbError,
//   insufficientParameters,
//   failureResponse,
// } from '../../common/service';
// import { DEFAULT_LIMIT } from '../../../db/models';

// export default class AttendanceController {
//   public static createAttendance(req: Request, res: Response) {
//     if (
//       req.body.checkIn &&
//       req.body.dayDate &&
//       typeof req.body.checkIn === 'string' &&
//       typeof req.body.dayDate === 'string'
//     ) {
//       const attendanceParams: AttendanceCreationAttributes = {
//         firstName: (<string>req.body.firstName).normalize().toLowerCase(),
//         lastName: (<string>req.body.lastName).normalize().toLowerCase(),
//         address: (<string>req.body.address)?.normalize().toLowerCase(),
//         email: (<string>req.body.email)?.normalize().toLowerCase(),
//         tel: (<string>req.body.tel)?.normalize().toLowerCase(),
//       };
//       Attendance.create(attendanceParams)
//         .then((attendanceData) =>
//           successResponse('create attendance successfull', attendanceData, res)
//         )
//         .catch((err) => dbError(err, res));
//     } else {
//       insufficientParameters(res);
//     }
//   }

//   public static getAttendance(req: Request, res: Response) {
//     if (
//       (req.body.id && typeof req.body.id === 'string') ||
//       (req.body.fistName &&
//         req.body.lastName &&
//         typeof req.body.firstName === 'string' &&
//         typeof req.body.lastName === 'string')
//     ) {
//       const filter = req.body.id
//         ? { id: req.body.id }
//         : {
//             firstName: (<string>req.body.firstName).normalize().toLowerCase(),
//             lastName: (<string>req.body.lastName).normalize().toLowerCase(),
//           };
//       const attendanceFilter = { where: filter };
//       Attendance.findOne(attendanceFilter)
//         .then((attendanceData) =>
//           successResponse('get attendance successfull', attendanceData, res)
//         )
//         .catch((err) => dbError(err, res));
//     } else {
//       insufficientParameters(res);
//     }
//   }

//   public static updateAttendance(req: Request, res: Response) {
//     if (
//       (req.body.id && typeof req.body.id === 'string') ||
//       (req.body.fistName &&
//         typeof req.body.firstName === 'string' &&
//         req.body.lastName &&
//         typeof req.body.lastName === 'string')
//     ) {
//       const filter = req.body.id
//         ? { id: req.body.id }
//         : {
//             firstName: (<string>req.body.firstName).normalize().toLowerCase(),
//             lastName: (<string>req.body.lastName).normalize().toLowerCase(),
//           };
//       const attendanceFilter = { where: filter };
//       Attendance.findOne(attendanceFilter)
//         .then((attendanceData) => {
//           if (!attendanceData) throw new Error("couldn't find attendance");
//           const attendanceParams: AttendanceCreationAttributes = {
//             firstName: req.body.firstName
//               ? (<string>req.body.firstName).normalize().toLowerCase()
//               : attendanceData.firstName,
//             lastName: req.body.lastName
//               ? (<string>req.body.lastName).normalize().toLowerCase()
//               : attendanceData.lastName,
//             email:
//               req.body.email && typeof req.body.email
//                 ? (<string>req.body.email).normalize().toLowerCase()
//                 : attendanceData.email,
//             address:
//               req.body.address && typeof req.body.address
//                 ? (<string>req.body.address).normalize().toLowerCase()
//                 : attendanceData.address,
//             tel:
//               req.body.tel && typeof req.body.tel
//                 ? (<string>req.body.tel).normalize().toLowerCase()
//                 : attendanceData.tel,
//           };
//           attendanceData.setAttributes(attendanceParams);
//           return attendanceData.save();
//         })
//         .then((attendanceData) =>
//           successResponse('attendance update sucessful', attendanceData, res)
//         )
//         .catch((err) => dbError(err, res));
//     } else {
//       insufficientParameters(res);
//     }
//   }

//   public static deleteAttendance(req: Request, res: Response) {
//     if (req.body.id) {
//       const attendanceFilter = { where: { id: req.body.id } };
//       Attendance.findOne(attendanceFilter)
//         .then((attendanceData) => attendanceData?.destroy())
//         .catch((err) => dbError(err, res));
//     } else {
//       insufficientParameters(res);
//     }
//   }

//   public static getAttendances(req: Request, res: Response) {
//     const limit =
//       req.body.limit && req.body.limit > 0 ? req.body.limit : DEFAULT_LIMIT;
//     const offset =
//       req.body.page && req.body.page > 0 ? (req.body.page - 1) * limit : 0;
//     const options = { limit, offset };
//     Attendance.findAll(options)
//       .then((attendancesData) =>
//         successResponse('users retrieved', attendancesData, res)
//       )
//       .catch((err) => failureResponse('couldnt retrieve users', err, res));
//   }
// }
