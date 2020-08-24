import { Request, Response } from 'express';
import {
  insufficientParameters,
  dbError,
  successResponse,
  failureResponse,
} from '../common/service';
import { Operation, DEFAULT_LIMIT } from '../../db/models';
import { OperationCreationAttributes } from '../../db/models/operation/type';

export default class OperationController {
  public static createOperation(req: Request, res: Response) {
    if (req.body.operation_name) {
      const operationParams: OperationCreationAttributes = {
        name: req.body.operation_name,
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
    if (req.body.id || req.body.operation_name) {
      const filter = req.body.id
        ? { id: req.body.id }
        : { name: req.body.operation_name };
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
    if (req.body.id || req.body.operation_name) {
      const operationFilter = req.body.id
        ? { where: { id: req.body.id } }
        : { where: { name: req.body.operation_name } };
      Operation.findOne(operationFilter)
        .then((operationData) => {
          if (!operationData) throw new Error("couldn't find operation");
          const operationParams: OperationCreationAttributes = {
            id: operationData?.id,
            name: req.body.operation_name
              ? req.body.operation_name
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
      req.body.limit && req.body.limit > 0 ? req.body.limit : DEFAULT_LIMIT;
    const offset =
      req.body.page && req.body.page > 0 ? (req.body.page - 1) * limit : 0;
    const options = { limit, offset };
    Operation.findAll(options)
      .then((operationsData) =>
        successResponse('users retrieved', operationsData, res)
      )
      .catch((err) => failureResponse('couldnt retrieve users', err, res));
  }
}
