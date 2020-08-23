import { Request, Response } from 'express';
import {
  insufficientParameters,
  dbError,
  successResponse,
  failureResponse,
} from '../common/service';
import { Privilege, DEFAULT_LIMIT } from '../../db/models';
import { createPrivilege, createPrivilegeByIds } from '../../middlewares/rbac';

export default class PrivilegeController {
  public static createPrivilege(req: Request, res: Response) {
    if (
      req.body.privilege_name &&
      !(req.body.resource_id || req.body.operation_id)
    ) {
      createPrivilege(req.body.privilege_name)
        .then((privData) =>
          successResponse('privilege created successfuly', privData, res)
        )
        .catch((err: Error) =>
          failureResponse('couldnt create privilege', err, res)
        );
    } else if (
      req.body.resource_id &&
      req.body.operation_id &&
      !req.body.privilege_name
    ) {
      createPrivilegeByIds(req.body.resource_id, req.body.operation_id)
        .then((privData) =>
          successResponse('privilege created successfuly', privData, res)
        )
        .catch((err: Error) => {
          failureResponse('couldnt create privilege', err, res);
        });
    } else {
      insufficientParameters(res);
    }
  }

  public static getPrivilege(req: Request, res: Response) {
    if (req.body.id || req.body.privilege_name) {
      const filter = req.body.id
        ? { id: req.body.id }
        : { name: req.body.privilege_name };
      const privilegeFilter = { where: filter };
      Privilege.findOne(privilegeFilter)
        .then((privilegeData) =>
          successResponse('get privilege successfull', privilegeData, res)
        )
        .catch((err) => dbError(err, res));
    } else {
      insufficientParameters(res);
    }
  }

  public static updatePrivilege(req: Request, res: Response) {
    if (req.body.id || req.body.privilege_name) {
      const privilegeFilter = req.body.id
        ? { where: { id: req.body.id } }
        : { where: { name: req.body.privilege_name } };
      Privilege.findOne(privilegeFilter)
        .then(async (privilegeData) => {
          if (!privilegeData) throw new Error("couldn't find privilege");
          privilegeData?.setResource(
            req.body.resource_id
              ? req.body.resource_id
              : (await privilegeData.getResource()).id
          );
          privilegeData?.setOperation(
            req.body.operation_id
              ? req.body.operation_id
              : (await privilegeData.getOperation()).id
          );
          // TODO: privilege name should be generated automatically
          // privilegeData?.setAttributes(privilegeParams);
          return privilegeData.save();
        })
        .then((privilegeData) =>
          successResponse('privilege update sucessful', privilegeData, res)
        )
        .catch((err) => dbError(err, res));
    } else {
      insufficientParameters(res);
    }
  }

  public static deletePrivilege(req: Request, res: Response) {
    if (req.body.id) {
      const privilegeFilter = { where: { id: req.body.id } };
      Privilege.findOne(privilegeFilter)
        .then((privilegeData) => privilegeData?.destroy())
        .catch((err) => {
          console.log(err);
          dbError(err, res);
        });
    } else {
      insufficientParameters(res);
    }
  }

  public static getPrivileges(req: Request, res: Response) {
    const limit =
      req.body.limit && req.body.limit > 0 ? req.body.limit : DEFAULT_LIMIT;
    const offset =
      req.body.page && req.body.page > 0 ? (req.body.page - 1) * limit : 0;
    const options = { limit, offset };
    Privilege.findAll(options)
      .then((privilegesData) =>
        successResponse('users retrieved', privilegesData, res)
      )
      .catch((err) => failureResponse('couldnt retrieve users', err, res));
  }
}
