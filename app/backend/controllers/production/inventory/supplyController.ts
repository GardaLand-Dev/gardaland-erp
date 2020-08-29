import { Request, Response } from 'express';
import { FindOptions, Includeable } from 'sequelize/types';
import { SupplyCreationAttributes } from '../../../db/models/supply/type';
import {
  successResponse,
  dbError,
  insufficientParameters,
  failureResponse,
} from '../../common/service';
import { DEFAULT_LIMIT, Supply, Supplier, Stockable } from '../../../db/models';

export default class SupplyController {
  public static createSupply(req: Request, res: Response) {
    if (
      req.body.quantity &&
      req.body.price &&
      req.body.supplierId &&
      req.body.stockableId &&
      typeof req.body.quantity === 'number' &&
      typeof req.body.price === 'number' &&
      typeof req.body.supplierId === 'string' &&
      typeof req.body.stockableId === 'string'
    ) {
      const supplyParams: SupplyCreationAttributes = {
        quantity: req.body.quantity,
        price: req.body.price,
        supplierId: req.body.supplierId,
        stockableId: req.body.stockableId,
        deliveredOn: req.body.deliveredOn,
      };
      Supply.create(supplyParams)
        .then(async (supplyData) => {
          successResponse('create supply successfull', supplyData, res);
          return (await supplyData.getStockable()).increment('quantity', {
            by: supplyData.quantity,
          });
        })
        .catch((err) => dbError(err, res));
    } else {
      insufficientParameters(res);
    }
  }

  public static getSupply(req: Request, res: Response) {
    if (req.query.id && typeof req.query.id === 'string') {
      const filter = { id: req.query.id };
      const supplyFilter = { where: filter };
      Supply.findOne(supplyFilter)
        .then((supplyData) =>
          successResponse('get supply successfull', supplyData, res)
        )
        .catch((err) => dbError(err, res));
    } else {
      insufficientParameters(res);
    }
  }

  public static updateSupply(req: Request, res: Response) {
    if (req.body.id && typeof req.body.id === 'string') {
      const filter = { id: req.body.id };
      const supplyFilter = { where: filter };
      Supply.findOne(supplyFilter)
        .then(async (supplyData) => {
          if (!supplyData) throw new Error("couldn't find supply");
          if (supplyData.stockableId !== req.body.stockableId) {
            await (await supplyData.getStockable()).decrement('quantity', {
              by: supplyData.quantity,
            });
          }
          const supplyParams: SupplyCreationAttributes = {
            quantity:
              req.body.quantity && typeof req.body.quantity === 'number'
                ? req.body.quantity
                : supplyData.quantity,
            price:
              req.body.price && typeof req.body.price === 'number'
                ? req.body.price
                : supplyData.price,
            deliveredOn: req.body.deliveredOn
              ? req.body.deliveredOn
              : supplyData.deliveredOn,
            supplierId:
              req.body.supplierId && typeof req.body.supplierId === 'string'
                ? req.body.supplierId
                : supplyData.supplierId,
            stockableId:
              req.body.stockableId && typeof req.body.stockableId === 'string'
                ? req.body.stockableId
                : supplyData.stockableId,
          };
          supplyData.setAttributes(supplyParams);
          return supplyData.save();
        })
        .then((supplyData) =>
          successResponse('supply update sucessful', supplyData, res)
        )
        .catch((err) => dbError(err, res));
    } else {
      insufficientParameters(res);
    }
  }

  // TODO: you may need to activate paranoid or custom isdeleted scope
  public static deleteSupply(req: Request, res: Response) {
    if (req.body.id) {
      const supplyFilter = { where: { id: req.body.id } };
      Supply.findOne(supplyFilter)
        .then(
          async (supplyData): Promise<any> => {
            if (!supplyData) throw new Error('cant find supply');
            if (req.body.archive === 'true') {
              supplyData.toBeArchived = true;
              return supplyData.save();
            }
            (await supplyData.getStockable()).decrement('quantity', {
              by: supplyData.quantity,
            });
            return supplyData.destroy();
          }
        )
        .catch((err) => dbError(err, res));
    } else {
      insufficientParameters(res);
    }
  }

  public static getSupplies(req: Request, res: Response) {
    const limit =
      typeof req.query.limit === 'number' && req.query.limit > 0
        ? req.query.limit
        : DEFAULT_LIMIT;
    const offset =
      typeof req.query.page === 'number' && req.query.page > 0
        ? (req.query.page - 1) * limit
        : 0;
    const options: FindOptions<import('../../../db/models/supply/type').Supply> = {
      limit,
      offset,
      order: [],
      include: [],
    };
    if (req.query.incSupplier === 'true')
      (<Includeable[]>options.include).push({ model: Supplier });
    if (req.query.incStockable === 'true')
      (<Includeable[]>options.include).push({ model: Stockable });
    if (req.query.orderDateDesc === 'true')
      (<Array<any>>options.order).push(['createdAt', 'DESC']);
    if (req.query.archived !== 'true')
      options.where = { toBeArchived: 'false' };
    // if (req.query.ingredient === 'true') options.where = { isIngredient: true };
    Supply.findAll(options)
      .then((suppliesData) =>
        successResponse('Supplies retrieved', suppliesData, res)
      )
      .catch((err) => failureResponse('couldnt retrieve Supplies', err, res));
  }
}
