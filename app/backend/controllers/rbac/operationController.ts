import { Request, Response } from 'express';
import {
  insufficientParameters,
  dbError,
  successResponse,
  failureResponse,
} from '../common/service';
import { Operation, DEFAULT_LIMIT } from '../../db/models';
import { OperationCreationAttributes } from '../../db/models/rbac/operation/type';

export default class OperationController {
  public static createOperation(req: Request, res: Response) {
    if (req.body.operationName) {
      const operationParams: OperationCreationAttributes = {
        name: req.body.operationName,
      };
      Operation.create(operationParams)
        .then((operationData) =>
          successResponse('create operation successfull', operationData, res)
        )
        .catch((err) => dbError(err, res));
    } else {
      insufficientParameters(res);
    }
  }

  public static getOperation(req: Request, res: Response) {
    if (req.body.id || req.body.operationName) {
      const filter = req.body.id
        ? { id: req.body.id }
        : { name: req.body.operationName };
      const operationFilter = { where: filter };
      Operation.findOne(operationFilter)
        .then((operationData) =>
          successResponse('get operation successfull', operationData, res)
        )
        .catch((err) => dbError(err, res));
    } else {
      insufficientParameters(res);
    }
  }

  public static updateOperation(req: Request, res: Response) {
    if (req.body.id || req.body.operationName) {
      const operationFilter = req.body.id
        ? { where: { id: req.body.id } }
        : { where: { name: req.body.operationName } };
      Operation.findOne(operationFilter)
        .then((operationData) => {
          if (!operationData) throw new Error("couldn't find operation");
          const operationParams: OperationCreationAttributes = {
            id: operationData?.id,
            name: req.body.operationName
              ? req.body.operationName
              : operationData?.name,
          };
          operationData?.setAttributes(operationParams);
          return operationData.save();
        })
        .then((operationData) =>
          successResponse('operation update sucessful', operationData, res)
        )
        .catch((err) => dbError(err, res));
    } else {
      insufficientParameters(res);
    }
  }

  public static deleteOperation(req: Request, res: Response) {
    if (req.body.id) {
      const operationFilter = { where: { id: req.body.id } };
      Operation.findOne(operationFilter)
        .then((operationData) => operationData?.destroy())
        .catch((err) => dbError(err, res));
    } else {
      insufficientParameters(res);
    }
  }

  public static getOperations(req: Request, res: Response) {
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
    Operation.findAll(options)
      .then((operationsData) =>
        successResponse('users retrieved', operationsData, res)
      )
      .catch((err) => failureResponse('couldnt retrieve users', err, res));
  }
}
