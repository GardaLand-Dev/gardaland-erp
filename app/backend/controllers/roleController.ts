import { Request, Response } from 'express';
import {
  insufficientParameters,
  dbError,
  successResponse,
} from './common/service';
import { Role } from '../db/models';
import { RoleCreationAttributes } from '../db/models/role/type';

export default class RoleController {
  public static createRole(req: Request, res: Response) {
    if (req.body.role_name) {
      if (
        req.body.privileges &&
        req.body.privileges.length &&
        req.body.privileges.length > 0
      ) {
        const roleParams: RoleCreationAttributes = { name: req.body.role_name };
        const roleData = Role.build(roleParams);
        roleData.addPrivileges(req.body.privileges);
        roleData
          .save()
          .then((rd) => successResponse('create role successfull', rd, res))
          .catch((err) => dbError(err, res));
      } else {
        const roleParams: RoleCreationAttributes = { name: req.body.role_name };
        Role.create(roleParams)
          .then((roleData) =>
            successResponse('create role successfull', roleData, res)
          )
          .catch((err) => dbError(err, res));
      }
    } else {
      insufficientParameters(res);
    }
  }

  public static getRole(req: Request, res: Response) {
    if (req.query.id || req.query.role_name) {
      const filter = req.query.id
        ? { id: req.query.id }
        : { name: req.query.role_name };
      const roleFilter = { where: filter };
      Role.findOne(roleFilter)
        .then((roleData) =>
          successResponse('get role successfull', roleData, res)
        )
        .catch((err) => dbError(err, res));
    } else {
      insufficientParameters(res);
    }
  }

  public static updateRole(req: Request, res: Response) {
    if (req.body.id || req.body.role_name) {
      const roleFilter = req.body.id
        ? { where: { id: req.body.id } }
        : { where: { name: req.body.role_name } };
      Role.findOne(roleFilter)
        .then((roleData) => {
          if (!roleData) throw new Error("couldn't find role");
          const roleParams: RoleCreationAttributes = {
            id: roleData?.id,
            name: req.body.role_name ? req.body.role_name : roleData?.name,
          };
          roleData?.setAttributes(roleParams);
          return roleData.save();
        })
        .then((roleData) =>
          successResponse('role update sucessful', roleData, res)
        )
        .catch((err) => dbError(err, res));
    } else {
      insufficientParameters(res);
    }
  }

  public static deleteRole(req: Request, res: Response) {
    if (req.query.id) {
      const roleFilter = { where: { id: req.query.id } };
      Role.findOne(roleFilter)
        .then((roleData) => roleData?.destroy())
        .catch((err) => dbError(err, res));
    } else {
      insufficientParameters(res);
    }
  }
}
