import { Request, Response } from 'express';
import { FindOptions } from 'sequelize/types';
import { StockableCreationAttributes } from '../../../db/models/stockable/type';
import {
  successResponse,
  dbError,
  insufficientParameters,
  failureResponse,
} from '../../common/service';
import { DEFAULT_LIMIT, Stockable } from '../../../db/models';

export default class StockableController {
  public static createStockable(req: Request, res: Response) {
    if (
      req.body.name &&
      req.body.unit &&
      req.body.alert_quantity &&
      typeof req.body.unit === 'string' &&
      typeof req.body.name === 'string' &&
      typeof req.body.is_ingredient === 'boolean' &&
      typeof req.body.alert_quantity === 'number'
    ) {
      const stockableParams: StockableCreationAttributes = {
        name: (<string>req.body.name).normalize().toLowerCase(),
        unit: (<string>req.body.unit).normalize().toLowerCase(),
        isIngredient: req.body.is_ingredient,
        quantity: req.body.quantity,
        alertQuantity: req.body.alert_quantity,
      };
      Stockable.create(stockableParams)
        .then((stockableData) =>
          successResponse('create stockable successfull', stockableData, res)
        )
        .catch((err) => dbError(err, res));
    } else {
      insufficientParameters(res);
    }
  }

  public static getStockable(req: Request, res: Response) {
    if (
      (req.body.id && typeof req.body.id === 'string') ||
      (req.body.name && typeof req.body.name === 'string')
    ) {
      const filter = req.body.id
        ? { id: req.body.id }
        : {
            name: (<string>req.body.name).normalize().toLowerCase(),
          };
      const stockableFilter = { where: filter };
      Stockable.findOne(stockableFilter)
        .then((stockableData) =>
          successResponse('get stockable successfull', stockableData, res)
        )
        .catch((err) => dbError(err, res));
    } else {
      insufficientParameters(res);
    }
  }

  public static updateStockable(req: Request, res: Response) {
    if (
      (req.body.id && typeof req.body.id === 'string') ||
      (req.body.name && typeof req.body.name === 'string')
    ) {
      const filter = req.body.id
        ? { id: req.body.id }
        : {
            name: (<string>req.body.name).normalize().toLowerCase(),
          };
      const stockableFilter = { where: filter };
      Stockable.findOne(stockableFilter)
        .then((stockableData) => {
          if (!stockableData) throw new Error("couldn't find stockable");
          const stockableParams: StockableCreationAttributes = {
            name: req.body.name
              ? (<string>req.body.name).normalize().toLowerCase()
              : stockableData.name,
            unit:
              req.body.unit && typeof req.body.unit === 'string'
                ? (<string>req.body.unit).normalize().toLowerCase()
                : stockableData.unit,
            isIngredient:
              req.body.is_ingredient &&
              typeof req.body.is_ingredient === 'boolean'
                ? req.body.is_ingredient
                : stockableData.isIngredient,
            quantity:
              req.body.quantity && typeof req.body.quantity === 'number'
                ? req.body.quantity
                : stockableData.quantity,
            alertQuantity:
              req.body.alert_quantity &&
              typeof req.body.alert_quantity === 'number'
                ? req.body.alert_quantity
                : stockableData.alertQuantity,
          };
          stockableData.setAttributes(stockableParams);
          return stockableData.save();
        })
        .then((stockableData) =>
          successResponse('stockable update sucessful', stockableData, res)
        )
        .catch((err) => dbError(err, res));
    } else {
      insufficientParameters(res);
    }
  }

  // TODO: you may need to activate paranoid or custom isdeleted scope
  public static deleteStockable(req: Request, res: Response) {
    if (req.body.id) {
      const stockableFilter = { where: { id: req.body.id } };
      Stockable.findOne(stockableFilter)
        .then((stockableData) => {
          if (!stockableData) throw new Error('cant find stockable');
          return stockableData.destroy();
        })
        .catch((err) => dbError(err, res));
    } else {
      insufficientParameters(res);
    }
  }

  public static getStockables(req: Request, res: Response) {
    const limit =
      req.body.limit && req.body.limit > 0 ? req.body.limit : DEFAULT_LIMIT;
    const offset =
      req.body.page && req.body.page > 0 ? (req.body.page - 1) * limit : 0;
    const options: FindOptions<import('../../../db/models/stockable/type').Stockable> = {
      limit,
      offset,
    };
    Stockable.findAll(options)
      .then((stockablesData) =>
        successResponse('users retrieved', stockablesData, res)
      )
      .catch((err) => failureResponse('couldnt retrieve users', err, res));
  }
}