import { Request, Response } from 'express';
import log from 'electron-log';
import { FindOptions, Includeable } from 'sequelize/types';
import { JwtRequest } from '../../../middlewares/authCheck';
import {
  EmployeeCreationAttributes,
  Employee,
  EmployeeAttributes,
} from '../../../db/models/humanResources/employee/type';
import {
  successResponse,
  dbError,
  insufficientParameters,
  failureResponse,
} from '../../common/service';
import dbConfig, {
  DEFAULT_LIMIT,
  User,
  Title,
  Salary,
} from '../../../db/models';

export default class EmployeeController {
  public static async createEmployee(req: JwtRequest, res: Response) {
    if (
      req.body.firstName &&
      req.body.lastName &&
      req.body.title &&
      typeof req.body.firstName === 'string' &&
      typeof req.body.lastName === 'string' &&
      typeof req.body.title === 'string'
    ) {
      const employeeParams: EmployeeCreationAttributes = {
        firstName: (<string>req.body.firstName).normalize().toLowerCase(),
        lastName: (<string>req.body.lastName).normalize().toLowerCase(),
        address: (<string>req.body.address)?.normalize().toLowerCase(),
        email: (<string>req.body.email)?.normalize().toLowerCase(),
        tel: (<string>req.body.tel)?.normalize().toLowerCase(),
      };
      const transaction = await dbConfig.transaction();
      try {
        const empData = await Employee.create(employeeParams, { transaction });
        empData.createTitle({ name: req.body.title }, { transaction });
        if (
          req.body.user &&
          req.body.user.username &&
          req.body.user.password &&
          req.body.user.roles &&
          typeof req.body.user.roles.length === 'number' &&
          req.body.user.roles.length > 0
        ) {
          const userData = await User.create(
            {
              userName: req.body.user.username,
              password: req.body.user.password,
              employeeId: empData.id,
            },
            { transaction }
          );
          await userData.addRoles(req.body.roles as string[], { transaction });
        }
        if (
          req.body.salary &&
          typeof req.body.salary === 'number' &&
          req.body.salary > 0 &&
          req.body.hourlyRate &&
          typeof req.body.hourlyRate === 'number' &&
          req.body.hourlyRate > 0
        ) {
          await empData.createSalary(
            {
              hourlyRate: req.body.hourlyRate,
              amount: req.body.salary,
            },
            { transaction }
          );
        }
        await transaction.commit();
        successResponse('employee created', empData, res);
      } catch (error) {
        log.error(error);
        transaction.rollback();
        dbError(error, res);
      }
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
      const options: FindOptions<EmployeeAttributes> = { where: filter };
      if (req.query.incAll === 'true') {
        options.include = [
          { model: Title, where: { to: null } },
          { model: Salary, where: { to: null } },
          { model: User },
        ];
      }
      Employee.findOne(options)
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
      typeof req.query.limit === 'string' &&
      // eslint-disable-next-line no-restricted-globals
      !isNaN(parseInt(req.query.limit, 10)) &&
      parseInt(req.query.limit, 10) > 0
        ? parseInt(req.query.limit, 10)
        : DEFAULT_LIMIT;
    const offset =
      typeof req.query.page === 'string' &&
      // eslint-disable-next-line no-restricted-globals
      !isNaN(parseInt(req.query.page, 10)) &&
      parseInt(req.query.page, 10) > 0
        ? (parseInt(req.query.page, 10) - 1) * limit
        : 0;
    const options: FindOptions<EmployeeAttributes> = {
      limit,
      offset,
      include: [],
    };
    if (req.query.all === 'true') {
      options.offset = null;
      options.limit = null;
    }
    if (req.query.incAll === 'true') {
      options.include = [
        { model: Title, where: { to: null } },
        { model: Salary, where: { to: null } },
        { model: User },
      ];
    } else {
      if (req.query.incTitle === 'true')
        (options.include as Includeable[]).push({
          model: Title,
          where: { to: null },
        });
      if (req.query.incSalary === 'true')
        (options.include as Includeable[]).push({
          model: Salary,
          where: { to: null },
        });
      if (req.query.incUser === 'true')
        (options.include as Includeable[]).push({ model: User });
    }
    Employee.findAll(options)
      .then((employeesData) =>
        successResponse('users retrieved', employeesData, res)
      )
      .catch((err) => failureResponse('couldnt retrieve users', err, res));
  }
}
