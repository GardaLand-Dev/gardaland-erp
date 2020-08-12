import { Request, Response } from 'express';
import {
  insufficientParameters,
  dbError,
  successResponse,
} from '../common/service';
import { Operation } from '../../db/models';
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
    if (req.query.id || req.query.operation_name) {
      const filter = req.query.id
        ? { id: req.query.id }
        : { name: req.query.operation_name };
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
    if (req.query.id) {
      const operationFilter = { where: { id: req.query.id } };
      Operation.findOne(operationFilter)
        .then((operationData) => operationData?.destroy())
        .catch((err) => dbError(err, res));
    } else {
      insufficientParameters(res);
    }
  }
}
