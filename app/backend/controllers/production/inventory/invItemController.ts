import { Request, Response } from 'express';
import { FindOptions } from 'sequelize/types';
import { InvItemCreationAttributes } from '../../../db/models/inventory/invItem/type';
import {
  successResponse,
  dbError,
  insufficientParameters,
  failureResponse,
} from '../../common/service';
import { DEFAULT_LIMIT, InvItem } from '../../../db/models';

export default class InvItemController {
  public static createInvItem(req: Request, res: Response) {
    if (
      req.body.name &&
      req.body.unit &&
      req.body.alertQuantity &&
      typeof req.body.unit === 'string' &&
      typeof req.body.name === 'string' &&
      typeof req.body.isIngredient === 'boolean' &&
      typeof req.body.alertQuantity === 'number'
    ) {
      const invItemParams: InvItemCreationAttributes = {
        name: (<string>req.body.name).normalize().toLowerCase(),
        unit: (<string>req.body.unit).normalize().toLowerCase(),
        isIngredient: req.body.isIngredient,
        alertQuantity: req.body.alertQuantity,
      };
      if (req.body.inStock !== null && typeof req.body.inStock === 'number')
        invItemParams.inStock = req.body.inStock;
      InvItem.create(invItemParams)
        .then((invItemData) =>
          successResponse('create invItem successfull', invItemData, res)
        )
        .catch((err) => dbError(err, res));
    } else {
      insufficientParameters(res);
    }
  }

  public static getInvItem(req: Request, res: Response) {
    if (
      (req.query.id && typeof req.query.id === 'string') ||
      (req.query.name && typeof req.query.name === 'string')
    ) {
      const filter = req.query.id
        ? { id: req.query.id }
        : {
            name: (<string>req.query.name).normalize().toLowerCase(),
          };
      const invItemFilter = { where: filter };
      InvItem.findOne(invItemFilter)
        .then((invItemData) =>
          successResponse('get invItem successfull', invItemData, res)
        )
        .catch((err) => dbError(err, res));
    } else {
      insufficientParameters(res);
    }
  }

  public static updateInvItem(req: Request, res: Response) {
    if (
      (req.body.id && typeof req.body.id === 'string') ||
      (req.body.name && typeof req.body.name === 'string')
    ) {
      const filter = req.body.id
        ? { id: req.body.id }
        : {
            name: (<string>req.body.name).normalize().toLowerCase(),
          };
      const invItemFilter = { where: filter };
      InvItem.findOne(invItemFilter)
        .then((invItemData) => {
          if (!invItemData) throw new Error("couldn't find invItem");
          const invItemParams: InvItemCreationAttributes = {
            name: req.body.name
              ? (<string>req.body.name).normalize().toLowerCase()
              : invItemData.name,
            unit:
              req.body.unit && typeof req.body.unit === 'string'
                ? (<string>req.body.unit).normalize().toLowerCase()
                : invItemData.unit,
            isIngredient:
              req.body.isIngredient &&
              typeof req.body.isIngredient === 'boolean'
                ? req.body.isIngredient
                : invItemData.isIngredient,
            inStock:
              req.body.inStock && typeof req.body.inStock === 'number'
                ? req.body.inStock
                : invItemData.inStock,
            alertQuantity:
              req.body.alertQuantity &&
              typeof req.body.alertQuantity === 'number'
                ? req.body.alertQuantity
                : invItemData.alertQuantity,
          };
          invItemData.setAttributes(invItemParams);
          return invItemData.save();
        })
        .then((invItemData) =>
          successResponse('invItem update sucessful', invItemData, res)
        )
        .catch((err) => dbError(err, res));
    } else {
      insufficientParameters(res);
    }
  }

  // TODO: you may need to activate paranoid or custom isdeleted scope
  public static deleteInvItem(req: Request, res: Response) {
    if (req.body.id) {
      const invItemFilter = { where: { id: req.body.id } };
      InvItem.findOne(invItemFilter)
        .then((invItemData) => {
          if (!invItemData) throw new Error('cant find invItem');
          return invItemData.destroy();
        })
        .catch((err) => dbError(err, res));
    } else {
      insufficientParameters(res);
    }
  }

  public static getInvItems(req: Request, res: Response) {
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
    const options: FindOptions<import('../../../db/models/inventory/invItem/type').InvItem> = {
      limit,
      offset,
    };
    if (req.query.all === 'true') {
      options.limit = null;
      options.offset = null;
    }
    if (req.query.ingredient === 'true') options.where = { isIngredient: true };
    InvItem.findAll(options)
      .then((invItemsData) =>
        successResponse('users retrieved', invItemsData, res)
      )
      .catch((err) => failureResponse('couldnt retrieve users', err, res));
  }
}
