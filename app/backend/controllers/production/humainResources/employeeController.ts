import { Request, Response } from 'express';
import {
  EmployeeCreationAttributes,
  Employee,
} from '../../../db/models/humanResources/employee/type';
import {
  successResponse,
  dbError,
  insufficientParameters,
  failureResponse,
} from '../../common/service';
import { DEFAULT_LIMIT, User } from '../../../db/models';

export default class EmployeeController {
  public static createEmployee(req: Request, res: Response) {
    if (
      req.body.firstName &&
      req.body.lastName &&
      typeof req.body.firstName === 'string' &&
      typeof req.body.lastName === 'string'
    ) {
      const employeeParams: EmployeeCreationAttributes = {
        firstName: (<string>req.body.firstName).normalize().toLowerCase(),
        lastName: (<string>req.body.lastName).normalize().toLowerCase(),
        address: (<string>req.body.address)?.normalize().toLowerCase(),
        email: (<string>req.body.email)?.normalize().toLowerCase(),
        tel: (<string>req.body.tel)?.normalize().toLowerCase(),
      };
      let id = '';
      Employee.create(employeeParams)
        .then((employeeData) => {
          id = employeeData.id;
          return successResponse(
            'create employee successfull',
            employeeData,
            res
          );
        })
        .then(() => {
          if (
            req.body.user &&
            req.body.user.username &&
            req.body.user.password
          ) {
            return User.create({
              userName: req.body.user.username,
              password: req.body.user.password,
              employeeId: id,
            });
          }
          return null;
        })
        .catch((err) => dbError(err, res));
    } else {
      insufficientParameters(res);
    }
  }

  public static getEmployee(req: Request, res: Response) {
    if (
      (req.query.id && typeof req.query.id === 'string') ||
      (req.query.fistName &&
        req.query.lastName &&
        typeof req.query.firstName === 'string' &&
        typeof req.query.lastName === 'string')
    ) {
      const filter = req.query.id
        ? { id: req.query.id }
        : {
            firstName: (<string>req.query.firstName).normalize().toLowerCase(),
            lastName: (<string>req.query.lastName).normalize().toLowerCase(),
          };
      const employeeFilter = { where: filter };
      Employee.findOne(employeeFilter)
        .then((employeeData) =>
          successResponse('get employee successfull', employeeData, res)
        )
        .catch((err) => dbError(err, res));
    } else {
      insufficientParameters(res);
    }
  }

  public static updateEmployee(req: Request, res: Response) {
    if (
      (req.body.id && typeof req.body.id === 'string') ||
      (req.body.fistName &&
        typeof req.body.firstName === 'string' &&
        req.body.lastName &&
        typeof req.body.lastName === 'string')
    ) {
      const filter = req.body.id
        ? { id: req.body.id }
        : {
            firstName: (<string>req.body.firstName).normalize().toLowerCase(),
            lastName: (<string>req.body.lastName).normalize().toLowerCase(),
          };
      const employeeFilter = { where: filter };
      Employee.findOne(employeeFilter)
        .then((employeeData) => {
          if (!employeeData) throw new Error("couldn't find employee");
          const employeeParams: EmployeeCreationAttributes = {
            firstName: req.body.firstName
              ? (<string>req.body.firstName).normalize().toLowerCase()
              : employeeData.firstName,
            lastName: req.body.lastName
              ? (<string>req.body.lastName).normalize().toLowerCase()
              : employeeData.lastName,
            email:
              req.body.email && typeof req.body.email
                ? (<string>req.body.email).normalize().toLowerCase()
                : employeeData.email,
            address:
              req.body.address && typeof req.body.address
                ? (<string>req.body.address).normalize().toLowerCase()
                : employeeData.address,
            tel:
              req.body.tel && typeof req.body.tel
                ? (<string>req.body.tel).normalize().toLowerCase()
                : employeeData.tel,
          };
          employeeData.setAttributes(employeeParams);
          return employeeData.save();
        })
        .then((employeeData) =>
          successResponse('employee update sucessful', employeeData, res)
        )
        .catch((err) => dbError(err, res));
    } else {
      insufficientParameters(res);
    }
  }

  public static deleteEmployee(req: Request, res: Response) {
    if (req.body.id) {
      const employeeFilter = { where: { id: req.body.id } };
      Employee.findOne(employeeFilter)
        .then((employeeData) => employeeData?.destroy())
        .catch((err) => dbError(err, res));
    } else {
      insufficientParameters(res);
    }
  }

  public static getEmployees(req: Request, res: Response) {
    const limit =
      typeof req.query.limit === 'number' && req.query.limit > 0
        ? req.query.limit
        : DEFAULT_LIMIT;
    const offset =
      typeof req.query.page === 'number' && req.query.page > 0
        ? (req.query.page - 1) * limit
        : 0;
    const options = { limit, offset };
    Employee.findAll(options)
      .then((employeesData) =>
        successResponse('users retrieved', employeesData, res)
      )
      .catch((err) => failureResponse('couldnt retrieve users', err, res));
  }
}
