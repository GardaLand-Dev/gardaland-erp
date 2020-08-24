import { Request, Response } from 'express';
import { FindOptions } from 'sequelize/types';
import {
  insufficientParameters,
  dbError,
  successResponse,
  failureResponse,
} from '../common/service';
import { User, Role, DEFAULT_LIMIT } from '../../db/models';
import { UserCreationAttributes } from '../../db/models/user/type';

export default class UserController {
  public static createUser(req: Request, res: Response) {
    if (req.body.user_name && req.body.password) {
      if (
        req.body.roles &&
        req.body.roles.length &&
        req.body.roles.length > 0
      ) {
        const userParams: UserCreationAttributes = {
          userName: req.body.user_name,
          password: req.body.password,
        };
        const userData = User.build(userParams);
        userData.addRoles(req.body.roles);
      } else {
        const userParams: UserCreationAttributes = {
          userName: req.body.user_name,
          password: req.body.password,
        };
        // const a = UserFactory(dbConfig1);
        // console.log(dbConfig1.isDefined('users'));
        User.create(userParams)
          .then((userData) =>
            successResponse('create user successfull', userData, res)
          )
          .catch((err) => dbError(err, res));
      }
    } else {
      insufficientParameters(res);
    }
  }

  public static getUser(req: Request, res: Response) {
    if (req.body.id || req.body.user_name) {
      const filter = req.body.id
        ? { id: req.body.id }
        : { userName: req.body.user_name };
      const userFilter = { where: filter };
      // const a = UserFactory(dbConfig1);
      User.findOne(userFilter)
        .then((userData) =>
          successResponse('get user successfull', userData, res)
        )
        .catch((err) => dbError(err, res));
    } else {
      insufficientParameters(res);
    }
  }

  public static updateUser(req: Request, res: Response) {
    if (req.body.id) {
      User.findByPk(req.body.id)
        .then((userData) => {
          if (!userData) throw new Error("couldn't recieve userdata");
          const userParams = {
            id: userData.id,
            userName: req.body.user_name
              ? req.body.user_name
              : userData.userName,
            password: req.body.password ? req.body.password : userData.password,
          };
          userData.setAttributes(userParams);
          return userData.save();
        })
        .then((userData) =>
          successResponse('user update sucessful', userData, res)
        )
        .catch((err) => dbError(err, res));
    } else {
      insufficientParameters(res);
    }
  }

  public static deleteUser(req: Request, res: Response) {
    if (req.body.id) {
      User.findByPk(req.body.id)
        .then((userData) => {
          if (!userData) throw Error('No matching user');
          return userData.destroy();
        })
        .then(() => successResponse('user deleted successfuly', {}, res))
        .catch((err) => dbError(err, res));
    } else {
      insufficientParameters(res);
    }
  }

  public static async addRoleUser(req: Request, res: Response) {
    if (req.body.id && (req.body.role_id || req.body.role_name)) {
      const filter = req.body.role_id
        ? { id: req.body.role_id }
        : { name: req.body.role_name };
      const rl = await Role.findOne({ where: filter });
      if (!rl) throw new Error('cant find role');
      const usr = await User.findByPk(req.body.id);
      if (!usr) throw Error('No matching user');
      usr
        .hasRole(rl)
        .then((hasRole) => {
          if (hasRole) throw new Error('user already has this role');
          return usr.addRole(rl);
        })
        .catch((err) => dbError(err, res));
    } else {
      insufficientParameters(res);
    }
  }

  public static async removeRoleUser(req: Request, res: Response) {
    if (req.body.id && (req.body.role_id || req.body.role_name)) {
      const filter = req.body.role_id
        ? { id: req.body.role_id }
        : { name: req.body.role_name };
      const rl = await Role.findOne({ where: filter });
      if (!rl) throw new Error('cant find role');
      const usr = await User.findByPk(req.body.id);
      if (!usr) throw Error('No matching user');
      usr
        .hasRole(rl)
        .then((hasRole) => {
          if (!hasRole) throw new Error('user doesnr have this role');
          return usr.removeRole(rl);
        })
        .catch((err) => dbError(err, res));
    } else {
      insufficientParameters(res);
    }
  }

  public static getUsers(req: Request, res: Response) {
    const limit =
      req.body.limit && req.body.limit > 0 ? req.body.limit : DEFAULT_LIMIT;
    const offset =
      req.body.page && req.body.page > 0 ? (req.body.page - 1) * limit : 0;
    const options: FindOptions<import('../../db/models/user/type').User> = {
      limit,
      offset,
      attributes: { exclude: ['password'] },
    };
    User.findAll(options)
      .then((usersData) => successResponse('users retrieved', usersData, res))
      .catch((err) => failureResponse('couldnt retrieve users', err, res));
  }
}
