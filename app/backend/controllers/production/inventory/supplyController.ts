import { Request, Response } from 'express';
import { FindOptions, Includeable } from 'sequelize/types';
import log from 'electron-log';
import { SupplyCreationAttributes } from '../../../db/models/inventory/supply/type';
import {
  successResponse,
  dbError,
  insufficientParameters,
  failureResponse,
} from '../../common/service';
import {
  DEFAULT_LIMIT,
  Supply,
  InvItem,
  Invoice,
  Supplier,
} from '../../../db/models';
import { JwtRequest } from '../../../middlewares/authCheck';
import { InvoiceCreationAttributes } from '../../../db/models/finance/invoice/type';

export default class SupplyController {
  public static async createSupply(req: JwtRequest, res: Response) {
    if (
      req.body.supplierId &&
      typeof req.body.supplierId === 'string' &&
      req.body.dueDate &&
      req.body.supplies &&
      typeof req.body.supplies.length === 'number' &&
      req.body.supplies.length > 0
    ) {
      const invoiceParams: InvoiceCreationAttributes = {
        dueDate: new Date(req.body.dueDate),
        supplierId: req.body.supplierId,
        createdBy: req.auth.id,
        amount: 0,
      };
      if (req.body.note && typeof req.body.note === 'string')
        invoiceParams.note = req.body.note;
      if (req.body.isPaid === true || req.body.isPaid === false)
        invoiceParams.isPaid = req.body.isPaid;

      const invoiceData = await Invoice.create(invoiceParams);
      let total = 0;
      const supplies: SupplyCreationAttributes[] = req.body.supplies.map(
        (sup): SupplyCreationAttributes => {
          total += sup.cost;
          return {
            quantity: sup.quantity,
            cost: sup.cost,
            invItemId: sup.invItemId,
            deliveredOn: req.body.deliveredOn,
            invoiceId: invoiceData.id,
          };
        }
      );
      invoiceData.amount = total;
      await invoiceData.save();
      await Supply.bulkCreate(supplies).catch(log.error);
      successResponse('create supply successfull', invoiceData, res);
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

  // public static updateSupply(req: Request, res: Response) {
  //   if (req.body.id && typeof req.body.id === 'string') {
  //     const filter = { id: req.body.id };
  //     const supplyFilter = { where: filter };
  //     Supply.findOne(supplyFilter)
  //       .then(async (supplyData) => {
  //         if (!supplyData) throw new Error("couldn't find supply");
  //         if (supplyData.invItemId !== req.body.invItemId) {
  //           await (await supplyData.getInvItem()).decrement('inStock', {
  //             by: supplyData.quantity,
  //           });
  //         }
  //         const supplyParams: SupplyCreationAttributes = {
  //           quantity:
  //             req.body.quantity && typeof req.body.quantity === 'number'
  //               ? req.body.quantity
  //               : supplyData.quantity,
  //           cost:
  //             req.body.cost && typeof req.body.cost === 'number'
  //               ? req.body.cost
  //               : supplyData.cost,
  //           deliveredOn: req.body.deliveredOn
  //             ? req.body.deliveredOn
  //             : supplyData.deliveredOn,
  //           invItemId:
  //             req.body.invItemId && typeof req.body.invItemId === 'string'
  //               ? req.body.invItemId
  //               : supplyData.invItemId,
  //           invoiceId: supplyData.invoiceId,
  //         };
  //         supplyData.setAttributes(supplyParams);
  //         return supplyData.save();
  //       })
  //       .then((supplyData) =>
  //         successResponse('supply update sucessful', supplyData, res)
  //       )
  //       .catch((err) => dbError(err, res));
  //   } else {
  //     insufficientParameters(res);
  //   }
  // }

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
            (await supplyData.getInvItem()).decrement('inStock', {
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
    const options: FindOptions<import('../../../db/models/inventory/supply/type').Supply> = {
      limit,
      offset,
      order: [],
      include: [],
    };
    if (req.query.all === 'true') {
      options.limit = null;
      options.offset = null;
    }
    if (typeof req.query.invoiceId === 'string')
      options.where = { invoiceId: req.query.invoiceId };
    if (req.query.incInvoice === 'true')
      (<Includeable[]>options.include).push({ model: Invoice });
    if (req.query.incInvItem === 'true')
      (<Includeable[]>options.include).push({ model: InvItem });
    if (req.query.orderDateDesc === 'true')
      (<Array<any>>options.order).push(['createdAt', 'DESC']);
    if (req.query.archived !== 'true') options.where = { toBeArchived: false };
    // if (req.query.ingredient === 'true') options.where = { isIngredient: true };
    Supply.findAll(options)
      .then((suppliesData) =>
        successResponse('Supplies retrieved', suppliesData, res)
      )
      .catch((err) => failureResponse('couldnt retrieve Supplies', err, res));
  }

  public static async getInvoices(req: Request, res: Response) {
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
    const options: FindOptions<import('../../../db/models/inventory/supply/type').Supply> = {
      limit,
      offset,
      order: [],
      include: [],
    };
    if (req.query.all === 'true') {
      options.limit = null;
      options.offset = null;
    }
    (<Includeable[]>options.include).push({
      model: Invoice,
      include: req.query.incSupplier === 'true' ? [Supplier] : undefined,
    });
    if (req.query.incSupplies === 'true' && req.query.incInvItems === 'true')
      (<Includeable[]>options.include).push({ model: InvItem });
    if (req.query.orderDateDesc === 'true')
      (<Array<any>>options.order).push(['createdAt', 'DESC']);
    if (req.query.archived !== 'true') options.where = { toBeArchived: false };
    // if (req.query.ingredient === 'true') options.where = { isIngredient: true };
    await Supply.findAll(options)
      .then((suppliesData) => {
        // data
        const map = new Map();
        suppliesData.forEach((supplyData) => {
          if (!map.get(supplyData.invoiceId)) {
            const invoiceData: {
              id: string;
              amount: number;
              dueDate: Date;
              supplierId: string;
              createdBy: string;
              isPaid: boolean;
              note: string;
              financialTransactionId: string;
              createdAt: Date;
              updatedAt: Date;
              supplies?: import('../../../db/models/inventory/supply/type').Supply[];
              supplier?: import('../../../db/models/inventory/supplier/type').Supplier;
            } = {
              id: supplyData.invoice.id,
              amount: supplyData.invoice.amount,
              dueDate: supplyData.invoice.dueDate,
              supplierId: supplyData.invoice.supplierId,
              createdBy: supplyData.invoice.createdBy,
              isPaid: supplyData.invoice.isPaid,
              note: supplyData.invoice.note,
              financialTransactionId: supplyData.invoice.financialTransactionId,
              createdAt: supplyData.invoice.createdAt,
              updatedAt: supplyData.invoice.updatedAt,
              supplier: supplyData.invoice.supplier,
              supplies: [],
            };
            if (req.query.incSupplies === 'true')
              invoiceData.supplies = [supplyData];
            map.set(supplyData.invoiceId, { ...invoiceData });
          } else if (req.query.incSupplies === 'true')
            map.get(supplyData.invoiceId).supplies.push(supplyData);
        });
        return successResponse(
          'Supplies retrieved',
          Array.from(map.values()),
          res
        );
      })
      .catch((err) => failureResponse('couldnt retrieve Supplies', err, res));
  }
}
