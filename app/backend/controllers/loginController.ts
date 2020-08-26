import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User, Role } from '../db/models';
import {
  unauthorizedRequest,
  successResponse,
  insufficientParameters,
} from './common/service';

export default class LoginController {
  public static login(req: Request, res: Response) {
    // TODO: password should pass by a hasher
    if (req.body.userName && req.body.password) {
      // TODO: userdata should have scopes
      User.findOne({
        where: { userName: req.body.userName, password: req.body.password },
        include: {
          model: Role,
          attributes: ['id', 'name'],
          through: {
            attributes: [],
          },
        },
        attributes: {
          exclude: ['password', 'createdAt', 'updatedAt'],
        },
      })
        .then((userData) => {
          if (!userData) throw new Error();
          const data = jwt.sign(
            userData.toJSON(),
            process.env.PRIVATE_KEY ? process.env.PRIVATE_KEY : 'yasser999',
            // TODO: try asymetric algorithm
            { algorithm: 'HS256' }
            // TODO: add expiration time
          );
          return successResponse('Login succeded', data, res);
        })
        .catch((err) => {
          console.log(err);
          unauthorizedRequest(res, 'Username or password is incorrect');
        });
    } else insufficientParameters(res);
  }
}
