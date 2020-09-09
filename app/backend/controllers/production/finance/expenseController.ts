import { Request, Response } from 'express';
import { FindOptions, Includeable } from 'sequelize/types';
import { ExpenseCreationAttributes } from '../../../db/models/finance/expense/type';
import {
  successResponse,
  dbError,
  insufficientParameters,
  failureResponse,
} from '../../common/service';
import { DEFAULT_LIMIT, Expense, Employee, User } from '../../../db/models';
import { JwtRequest } from '../../../middlewares/authCheck';

export default class ExpenseController {
  public static createExpense(req: JwtRequest, res: Response) {
    if (
      req.body.note &&
      typeof req.body.note === 'string' &&
      req.body.amount &&
      typeof req.body.amount === 'number'
    ) {
      const expenseParams: ExpenseCreationAttributes = {
        amount: req.body.amount,
        note: req.body.note,
        createdBy: req.auth.id,
      };
      if (req.body.createdAt) expenseParams.createdAt = req.body.createdAt;
      Expense.create(expenseParams)
        .then((expenseData) =>
          successResponse('create expense successfull', expenseData, res)
        )
        .catch((err) => dbError(err, res));
    } else {
      insufficientParameters(res);
    }
  }

  public static getExpense(req: Request, res: Response) {
    if (req.query.id && typeof req.query.id === 'string') {
      const filter = { id: req.query.id };
      const expenseFilter = { where: filter };
      Expense.findOne(expenseFilter)
        .then((expenseData) =>
          successResponse('get expense successfull', expenseData, res)
        )
        .catch((err) => dbError(err, res));
    } else {
      insufficientParameters(res);
    }
  }

  public static updateExpense(req: JwtRequest, res: Response) {
    if (req.body.id && typeof req.body.id === 'string') {
      const filter = { id: req.body.id };
      const expenseFilter = { where: filter };
      Expense.findOne(expenseFilter)
        .then(async (expenseData) => {
          if (!expenseData) throw new Error("couldn't find expense");
          const expenseParams: ExpenseCreationAttributes = {
            amount: req.body.amount ? req.body.amount : expenseData.amount,
            note: req.body.note ? req.body.note : expenseData.note,
            createdAt: req.body.createdAt
              ? req.body.createdAt
              : expenseData.createdAt,
            createdBy: req.body.auth.id,
          };
          expenseData.setAttributes(expenseParams);
          return expenseData.save();
        })
        .then((expenseData) =>
          successResponse('expense update sucessful', expenseData, res)
        )
        .catch((err) => dbError(err, res));
    } else {
      insufficientParameters(res);
    }
  }

  // TODO: you may need to activate paranoid or custom isdeleted scope
  public static deleteExpense(req: Request, res: Response) {
    if (req.body.id) {
      const expenseFilter = { where: { id: req.body.id } };
      Expense.findOne(expenseFilter)
        .then((expenseData) => {
          return expenseData.destroy();
        })
        .catch((err) => dbError(err, res));
    } else {
      insufficientParameters(res);
    }
  }

  public static getExpenses(req: Request, res: Response) {
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
    const options: FindOptions<import('../../../db/models/finance/expense/type').Expense> = {
      limit,
      offset,
      include: [],
      order: [['updatedAt', 'DESC']],
    };
    if (req.query.all === 'true') {
      options.limit = null;
      options.offset = null;
    }
    if (req.query.incEmployee === 'true')
      (<Includeable[]>options.include).push({
        model: User,
        include: [{ model: Employee }],
      });
    // if (req.query.ingredient === 'true') options.where = { isIngredient: true };
    Expense.findAll(options)
      .then((expensesData) =>
        successResponse('Expenses retrieved', expensesData, res)
      )
      .catch((err) => failureResponse('couldnt retrieve Expenses', err, res));
  }
}
