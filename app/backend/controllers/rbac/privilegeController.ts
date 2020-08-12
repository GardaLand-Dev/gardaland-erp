import { Request, Response } from 'express';
import {
  insufficientParameters,
  dbError,
  successResponse,
} from '../common/service';
import { Privilege } from '../../db/models';
import { PrivilegeCreationAttributes } from '../../db/models/privilege/type';

export default class PrivilegeController {
  public static createPrivilege(req: Request, res: Response) {
    if (
      req.body.privilege_name &&
      req.body.resource_id &&
      req.body.operation_id
    ) {
      const privilegeParams: PrivilegeCreationAttributes = {
        name: req.body.privilege_name,
      };
      Privilege.create(privilegeParams)
        .then((privilegeData) => {
          privilegeData.setOperation();
          privilegeData.setResource();
          return privilegeData.save();
        })
        .then((privilegeData) =>
          successResponse('create privilege successfull', privilegeData, res)
        )
        .catch((err) => dbError(err, res));
    } else {
      insufficientParameters(res);
    }
  }

  public static getPrivilege(req: Request, res: Response) {
    if (req.query.id || req.query.privilege_name) {
      const filter = req.query.id
        ? { id: req.query.id }
        : { name: req.query.privilege_name };
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
    if (req.query.id) {
      const privilegeFilter = { where: { id: req.query.id } };
      Privilege.findOne(privilegeFilter)
        .then((privilegeData) => privilegeData?.destroy())
        .catch((err) => dbError(err, res));
    } else {
      insufficientParameters(res);
    }
  }
}
