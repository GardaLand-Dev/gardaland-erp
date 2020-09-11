import { Request, Response } from 'express';
import { FindOptions, Includeable } from 'sequelize/types';
import { InvoiceCreationAttributes } from '../../../db/models/finance/invoice/type';
import {
  successResponse,
  dbError,
  insufficientParameters,
  failureResponse,
} from '../../common/service';
import { DEFAULT_LIMIT, Invoice, User, Supplier } from '../../../db/models';
import { JwtRequest } from '../../../middlewares/authCheck';

export default class InvoiceController {
  public static createInvoice(req: JwtRequest, res: Response) {
    if (
      req.body.dueDate &&
      req.body.supplierId &&
      typeof req.body.supplierId === 'string' &&
      req.body.amount &&
      typeof req.body.amount === 'number' &&
      req.body.note &&
      typeof req.body.note === 'string'
    ) {
      const invoiceParams: InvoiceCreationAttributes = {
        amount: req.body.amount,
        supplierId: req.body.supplierId,
        createdBy: req.auth.id,
        dueDate: new Date(req.body.dueDate),
        note: req.body.note,
        createdAt: req.body.createdAt,
      };
      if (req.body.isPaid === true || req.body.isPaid === false)
        invoiceParams.isPaid = req.body.isPaid;
      Invoice.create(invoiceParams)
        .then((invoiceData) =>
          successResponse('create invoice successfull', invoiceData, res)
        )
        .catch((err) => dbError(err, res));
    } else {
      insufficientParameters(res);
    }
  }

  public static getInvoice(req: Request, res: Response) {
    if (req.query.id && typeof req.query.id === 'string') {
      const filter = { id: req.query.id };
      const invoiceFilter = { where: filter };
      Invoice.findOne(invoiceFilter)
        .then((invoiceData) =>
          successResponse('get invoice successfull', invoiceData, res)
        )
        .catch((err) => dbError(err, res));
    } else {
      insufficientParameters(res);
    }
  }

  public static updateInvoice(req: JwtRequest, res: Response) {
    if (req.body.id && typeof req.body.id === 'string') {
      const filter = { id: req.body.id };
      const invoiceFilter = { where: filter };
      Invoice.findOne(invoiceFilter)
        .then(async (invoiceData) => {
          if (!invoiceData) throw new Error("couldn't find invoice");
          const invoiceParams: InvoiceCreationAttributes = {
            amount: req.body.amount ? req.body.amount : invoiceData.amount,
            note: req.body.note ? req.body.note : invoiceData.note,
            supplierId: req.body.supplierId
              ? req.body.supplierId
              : invoiceData.supplierId,
            createdBy: req.body.auth.id,
            dueDate: req.body.dueDate
              ? new Date(req.body.dueData)
              : invoiceData.dueDate,
          };
          if (req.body.isPaid === true || req.body.isPaid === false)
            invoiceParams.isPaid = req.body.isPaid;
          invoiceData.setAttributes(invoiceParams);
          return invoiceData.save();
        })
        .then((invoiceData) =>
          successResponse('invoice update sucessful', invoiceData, res)
        )
        .catch((err) => dbError(err, res));
    } else {
      insufficientParameters(res);
    }
  }

  // TODO: you may need to activate paranoid or custom isdeleted scope
  public static deleteInvoice(req: Request, res: Response) {
    if (req.body.id) {
      const invoiceFilter = { where: { id: req.body.id } };
      Invoice.findOne(invoiceFilter)
        .then((invoiceData) => {
          return invoiceData.destroy();
        })
        .catch((err) => dbError(err, res));
    } else {
      insufficientParameters(res);
    }
  }

  public static getInvoices(req: Request, res: Response) {
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
    const options: FindOptions<import('../../../db/models/finance/invoice/type').Invoice> = {
      limit,
      offset,
      include: [],
      order: [['updatedAt', 'DESC']],
    };
    if (req.query.all === 'true') {
      options.limit = null;
      options.offset = null;
    }
    if (req.query.incSupplier === 'true')
      (<Includeable[]>options.include).push({
        model: User,
        include: [{ model: Supplier }],
      });
    // if (req.query.ingredient === 'true') options.where = { isIngredient: true };
    Invoice.findAll(options)
      .then((invoicesData) =>
        successResponse('Invoices retrieved', invoicesData, res)
      )
      .catch((err) => failureResponse('couldnt retrieve Invoices', err, res));
  }
}
