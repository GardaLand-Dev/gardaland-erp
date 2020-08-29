import { Request, Response } from 'express';
import { FindOptions, Includeable } from 'sequelize/types';
import { SupplierCreationAttributes } from '../../../db/models/supplier/type';
import {
  successResponse,
  dbError,
  insufficientParameters,
  failureResponse,
} from '../../common/service';
import { DEFAULT_LIMIT, Supplier, Supply } from '../../../db/models';

export default class SupplierController {
  public static createSupplier(req: Request, res: Response) {
    if (req.body.name && typeof req.body.name === 'string') {
      const supplierParams: SupplierCreationAttributes = {
        name: req.body.name,
      };
      if (req.body.tel && typeof req.body.tel)
        supplierParams.tel = req.body.tel;
      if (req.body.address && typeof req.body.address)
        supplierParams.address = req.body.address;
      Supplier.create(supplierParams)
        .then((supplierData) =>
          successResponse('create supplier successfull', supplierData, res)
        )
        .catch((err) => dbError(err, res));
    } else {
      insufficientParameters(res);
    }
  }

  public static getSupplier(req: Request, res: Response) {
    if (req.query.id && typeof req.query.id === 'string') {
      const filter = { id: req.query.id };
      const supplierFilter = { where: filter };
      Supplier.findOne(supplierFilter)
        .then((supplierData) =>
          successResponse('get supplier successfull', supplierData, res)
        )
        .catch((err) => dbError(err, res));
    } else {
      insufficientParameters(res);
    }
  }

  public static updateSupplier(req: Request, res: Response) {
    if (req.body.id && typeof req.body.id === 'string') {
      const filter = { id: req.body.id };
      const supplierFilter = { where: filter };
      Supplier.findOne(supplierFilter)
        .then(async (supplierData) => {
          if (!supplierData) throw new Error("couldn't find supplier");
          const supplierParams: SupplierCreationAttributes = {
            name:
              req.body.name && typeof req.body.name === 'string'
                ? req.body.name
                : supplierData.name,
            address:
              req.body.address && typeof req.body.address === 'string'
                ? req.body.address
                : supplierData.address,
            tel: req.body.tel ? req.body.tel : supplierData.tel,
          };
          supplierData.setAttributes(supplierParams);
          return supplierData.save();
        })
        .then((supplierData) =>
          successResponse('supplier update sucessful', supplierData, res)
        )
        .catch((err) => dbError(err, res));
    } else {
      insufficientParameters(res);
    }
  }

  // TODO: you may need to activate paranoid or custom isdeleted scope
  public static deleteSupplier(req: Request, res: Response) {
    if (req.body.id) {
      const supplierFilter = { where: { id: req.body.id } };
      Supplier.findOne(supplierFilter)
        .then((supplierData) => {
          return supplierData.destroy();
        })
        .catch((err) => dbError(err, res));
    } else {
      insufficientParameters(res);
    }
  }

  public static getSuppliers(req: Request, res: Response) {
    const limit =
      typeof req.query.limit === 'number' && req.query.limit > 0
        ? req.query.limit
        : DEFAULT_LIMIT;
    const offset =
      typeof req.query.page === 'number' && req.query.page > 0
        ? (req.query.page - 1) * limit
        : 0;
    const options: FindOptions<import('../../../db/models/supplier/type').Supplier> = {
      limit,
      offset,
      include: [],
    };
    if (req.query.incSupplies === 'true')
      (<Includeable[]>options.include).push({ model: Supply });
    // if (req.query.ingredient === 'true') options.where = { isIngredient: true };
    Supplier.findAll(options)
      .then((suppliersData) =>
        successResponse('Suppliers retrieved', suppliersData, res)
      )
      .catch((err) => failureResponse('couldnt retrieve Suppliers', err, res));
  }
}
