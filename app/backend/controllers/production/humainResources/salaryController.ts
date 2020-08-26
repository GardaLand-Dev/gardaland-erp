import { Request, Response } from 'express';
import {
  // SalaryCreationAttributes,
  Salary,
} from '../../../db/models/salary/type';
import {
  successResponse,
  // dbError,
  // insufficientParameters,
  failureResponse,
} from '../../common/service';
import { DEFAULT_LIMIT } from '../../../db/models';

export default class SalaryController {
  // public static createSalary(req: Request, res: Response) {
  //   if (
  //     req.body.firstName &&
  //     req.body.lastName &&
  //     typeof req.body.firstName === 'string' &&
  //     typeof req.body.lastName === 'string'
  //   ) {
  //     const salaryParams: SalaryCreationAttributes = {
  //       firstName: (<string>req.body.firstName).normalize().toLowerCase(),
  //       lastName: (<string>req.body.lastName).normalize().toLowerCase(),
  //       address: (<string>req.body.address)?.normalize().toLowerCase(),
  //       email: (<string>req.body.email)?.normalize().toLowerCase(),
  //       tel: (<string>req.body.tel)?.normalize().toLowerCase(),
  //     };
  //     Salary.create(salaryParams)
  //       .then((salaryData) =>
  //         successResponse('create salary successfull', salaryData, res)
  //       )
  //       .catch((err) => dbError(err, res));
  //   } else {
  //     insufficientParameters(res);
  //   }
  // }

  // public static getSalary(req: Request, res: Response) {
  //   if (
  //     (req.body.id && typeof req.body.id === 'string') ||
  //     (req.body.employeeId && typeof req.body.employeeId === 'string')
  //   ) {
  //     const filter = req.body.id
  //       ? { id: req.body.id }
  //       : {
  //           firstName: (<string>req.body.firstName).normalize().toLowerCase(),
  //           lastName: (<string>req.body.lastName).normalize().toLowerCase(),
  //         };
  //     const salaryFilter = { where: filter };
  //     Salary.findOne(salaryFilter)
  //       .then((salaryData) =>
  //         successResponse('get salary successfull', salaryData, res)
  //       )
  //       .catch((err) => dbError(err, res));
  //   } else {
  //     insufficientParameters(res);
  //   }
  // }

  // public static updateSalary(req: Request, res: Response) {
  //   if (
  //     (req.body.id && typeof req.body.id === 'string') ||
  //     (req.body.fistName &&
  //       typeof req.body.firstName === 'string' &&
  //       req.body.lastName &&
  //       typeof req.body.lastName === 'string')
  //   ) {
  //     const filter = req.body.id
  //       ? { id: req.body.id }
  //       : {
  //           firstName: (<string>req.body.firstName).normalize().toLowerCase(),
  //           lastName: (<string>req.body.lastName).normalize().toLowerCase(),
  //         };
  //     const salaryFilter = { where: filter };
  //     Salary.findOne(salaryFilter)
  //       .then((salaryData) => {
  //         if (!salaryData) throw new Error("couldn't find salary");
  //         const salaryParams: SalaryCreationAttributes = {
  //           firstName: req.body.firstName
  //             ? (<string>req.body.firstName).normalize().toLowerCase()
  //             : salaryData.firstName,
  //           lastName: req.body.lastName
  //             ? (<string>req.body.lastName).normalize().toLowerCase()
  //             : salaryData.lastName,
  //           email:
  //             req.body.email && typeof req.body.email
  //               ? (<string>req.body.email).normalize().toLowerCase()
  //               : salaryData.email,
  //           address:
  //             req.body.address && typeof req.body.address
  //               ? (<string>req.body.address).normalize().toLowerCase()
  //               : salaryData.address,
  //           tel:
  //             req.body.tel && typeof req.body.tel
  //               ? (<string>req.body.tel).normalize().toLowerCase()
  //               : salaryData.tel,
  //         };
  //         salaryData.setAttributes(salaryParams);
  //         return salaryData.save();
  //       })
  //       .then((salaryData) =>
  //         successResponse('salary update sucessful', salaryData, res)
  //       )
  //       .catch((err) => dbError(err, res));
  //   } else {
  //     insufficientParameters(res);
  //   }
  // }

  // public static deleteSalary(req: Request, res: Response) {
  //   if (req.body.id) {
  //     const salaryFilter = { where: { id: req.body.id } };
  //     Salary.findOne(salaryFilter)
  //       .then((salaryData) => salaryData?.destroy())
  //       .catch((err) => dbError(err, res));
  //   } else {
  //     insufficientParameters(res);
  //   }
  // }
  /**
   * TODO: add 'active' scope to salaries to mark active salaries
   * and use it int the following method
   */

  public static getSalaries(req: Request, res: Response) {
    const limit =
      req.body.limit && req.body.limit > 0 ? req.body.limit : DEFAULT_LIMIT;
    const offset =
      req.body.page && req.body.page > 0 ? (req.body.page - 1) * limit : 0;
    const options = { limit, offset };
    Salary.findAll(options)
      .then((salarysData) =>
        successResponse('users retrieved', salarysData, res)
      )
      .catch((err) => failureResponse('couldnt retrieve users', err, res));
  }
}
