import { Request, Response } from 'express';
import {
  insufficientParameters,
  dbError,
  successResponse,
} from '../common/service';
import { User } from '../../db/models';
import { UserCreationAttributes } from '../../db/models/user/type';

export default class UserController {
  public static createUser(req: Request, res: Response) {
    if (
      req.body.user_name &&
      req.body.password &&
      req.body.first_name &&
      req.body.last_name &&
      req.body.email &&
      req.body.phone
    ) {
      if (
        req.body.roles &&
        req.body.roles.length &&
        req.body.roles.length > 0
      ) {
        const userParams: UserCreationAttributes = {
          userName: req.body.user_name,
          password: req.body.password,
          firstName: req.body.first_name,
          lastName: req.body.last_name,
          email: req.body.email,
          phone: req.body.phone,
        };
        const userData = User.build(userParams);
        userData.addRoles(req.body.roles);
      } else {
        const userParams: UserCreationAttributes = {
          userName: req.body.user_name,
          password: req.body.password,
          firstName: req.body.first_name,
          lastName: req.body.last_name,
          email: req.body.email,
          phone: req.body.phone,
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
    if (req.query.id || req.query.user_name) {
      const filter = req.query.id
        ? { id: req.query.id }
        : { userName: req.query.user_name };
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
    if (
      (req.body.id || req.body.user_name) &&
      (req.body.user_name ||
        req.body.first_name ||
        req.body.last_name ||
        req.body.email ||
        req.body.phone)
    ) {
      const userFilter = { where: { id: req.body.id } };
      User.findOne(userFilter)
        .then((userData) => {
          if (!userData) throw new Error("couldn't recieve userdata");
          const userParams = {
            id: userData?.id,
            userName: req.body.user_name
              ? req.body.user_name
              : userData?.userName,
            password: req.body.password
              ? req.body.password
              : userData?.password,
            firstName: req.body.first_name
              ? req.body.first_name
              : userData?.firstName,
            lastName: req.body.last_name
              ? req.body.last_name
              : userData?.lastName,
            email: req.body.email ? req.body.email : userData?.email,
            phone: req.body.phone ? req.body.phone : userData?.phone,
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
    if (req.params.id) {
      const userFilter = { where: { id: req.params.id } };
      User.findOne(userFilter)
        .then((userData) => userData?.destroy())
        .catch((err) => dbError(err, res));
    } else {
      insufficientParameters(res);
    }
  }
}
