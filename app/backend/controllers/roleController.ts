import { Request, Response } from 'express';
import {
  insufficientParameters,
  dbError,
  successResponse,
} from './common/service';
import { RoleService } from '../db/models';
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
        const roleData = RoleService.build(roleParams);
        roleData.addPrivileges(req.body.privileges);
      } else {
        const roleParams: RoleCreationAttributes = { name: req.body.role_name };
        RoleService.create(roleParams)
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
    if (req.params.id || req.params.role_name) {
      const filter = req.params.id
        ? { id: req.params.id }
        : { roleName: req.params.role_name };
      const roleFilter = { where: filter };
      RoleService.findOne(roleFilter)
        .then((roleData) =>
          successResponse('get role successfull', roleData, res)
        )
        .catch((err) => dbError(err, res));
    } else {
      insufficientParameters(res);
    }
  }

  // public static updateRole(req: Request, res: Response) {
  //   if (
  //     (req.body.id || req.body.role_name) &&
  //     (req.body.role_name ||
  //       req.body.first_name ||
  //       req.body.last_name ||
  //       req.body.email ||
  //       req.body.phone)
  //   ) {
  //     const roleFilter = { where: { id: req.body.id } };
  //     RoleService
  //       .findOne(roleFilter)
  //       .then((roleData) => {
  //         const roleParams = {
  //           id: roleData.id,
  //           roleName: req.body.role_name
  //             ? req.body.role_name
  //             : roleData.roleName,
  //           password: req.body.password ? req.body.password : roleData.password,
  //           firstName: req.body.first_name
  //             ? req.body.first_name
  //             : roleData.firstName,
  //           lastName: req.body.last_name
  //             ? req.body.last_name
  //             : roleData.lastName,
  //           email: req.body.email ? req.body.email : roleData.email,
  //           phone: req.body.phone ? req.body.phone : roleData.phone,
  //         };
  //         roleData.setAttributes(roleParams);
  //         return roleData.save();
  //       })
  //       .then((roleData) =>
  //         successResponse('role update sucessful', roleData, res)
  //       )
  //       .catch((err) => dbError(err, res));
  //   } else {
  //     insufficientParameters(res);
  //   }
  // }

  public static deleteRole(req: Request, res: Response) {
    if (req.params.id) {
      const roleFilter = { where: { id: req.params.id } };
      RoleService.findOne(roleFilter)
        .then((roleData) => roleData?.destroy())
        .catch((err) => dbError(err, res));
    } else {
      insufficientParameters(res);
    }
  }
}
