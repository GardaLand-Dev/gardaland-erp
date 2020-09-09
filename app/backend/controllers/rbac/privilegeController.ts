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
      req.body.privilegeName &&
      !(req.body.resourceId || req.body.operationId)
    ) {
      createPrivilege(req.body.privilegeName)
        .then((privData) =>
          successResponse('privilege created successfuly', privData, res)
        )
        .catch((err: Error) =>
          failureResponse('couldnt create privilege', err, res)
        );
    } else if (
      req.body.resourceId &&
      req.body.operationId &&
      !req.body.privilegeName
    ) {
      createPrivilegeByIds(req.body.resourceId, req.body.operationId)
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
    if (req.body.id || req.body.privilegeName) {
      const filter = req.body.id
        ? { id: req.body.id }
        : { name: req.body.privilegeName };
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
    if (req.body.id || req.body.privilegeName) {
      const privilegeFilter = req.body.id
        ? { where: { id: req.body.id } }
        : { where: { name: req.body.privilegeName } };
      Privilege.findOne(privilegeFilter)
        .then(async (privilegeData) => {
          if (!privilegeData) throw new Error("couldn't find privilege");
          privilegeData?.setResource(
            req.body.resourceId
              ? req.body.resourceId
              : (await privilegeData.getResource()).id
          );
          privilegeData?.setOperation(
            req.body.operationId
              ? req.body.operationId
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
        .catch((err) => dbError(err, res));
    } else {
      insufficientParameters(res);
    }
  }

  public static getPrivileges(req: Request, res: Response) {
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
    const options = { limit, offset };
    Privilege.findAll(options)
      .then((privilegesData) =>
        successResponse('users retrieved', privilegesData, res)
      )
      .catch((err) => failureResponse('couldnt retrieve users', err, res));
  }
}
