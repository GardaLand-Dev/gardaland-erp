import { Request, Response } from 'express';
import { FindOptions, Includeable } from 'sequelize/types';
import { SupplimentCreationAttributes } from '../../../db/models/products/suppliment/type';
import {
  successResponse,
  dbError,
  insufficientParameters,
  failureResponse,
} from '../../common/service';
import { DEFAULT_LIMIT, Suppliment, InvItem } from '../../../db/models';

export default class SupplimentController {
  public static createSuppliment(req: Request, res: Response) {
    if (
      req.body.name &&
      req.body.quantity &&
      req.body.price &&
      req.body.invItemId
    ) {
      const supplimentParams: SupplimentCreationAttributes = {
        name: (<string>req.body.name).normalize().toLowerCase(),
        quantity: req.body.quantity,
        price: req.body.price,
        invItemId: req.body.invItemId,
      };
      Suppliment.create(supplimentParams)
        .then((supplimentData) =>
          successResponse(
            'create suppliment successful',
            supplimentData.toJSON(),
            res
          )
        )
        .catch((err) => {
          console.log(err);
          dbError(err, res);
        });
    } else {
      insufficientParameters(res);
    }
  }

  public static getSuppliment(req: Request, res: Response) {
    if (req.query.id || req.query.name) {
      const filter = req.query.id
        ? { id: req.query.id }
        : {
            name: (<string>req.query.name).normalize().toLowerCase(),
          };
      const supplimentFilter = { where: filter };
      Suppliment.findOne(supplimentFilter)
        .then((supplimentData) =>
          successResponse('get suppliment successfull', supplimentData, res)
        )
        .catch((err) => dbError(err, res));
    } else {
      insufficientParameters(res);
    }
  }

  // public static updateSuppliment(req: Request, res: Response) {
  //   if (
  //     (req.body.id && typeof req.body.id === 'string') ||
  //     (req.body.name && typeof req.body.name === 'string')
  //   ) {
  //     const filter = req.body.id
  //       ? { id: req.body.id }
  //       : {
  //           name: (<string>req.body.name).normalize().toLowerCase(),
  //         };
  //     const supplimentFilter = { where: filter };
  //     Suppliment.findOne(supplimentFilter)
  //       .then((supplimentData) => {
  //         if (!supplimentData) throw new Error("couldn't find suppliment");
  //         const supplimentParams: SupplimentCreationAttributes = {
  //           name: req.body.name
  //             ? (<string>req.body.name).normalize().toLowerCase()
  //             : supplimentData.name,
  //         };
  //         supplimentData.setAttributes(supplimentParams);
  //         return supplimentData.save();
  //       })
  //       .then((supplimentData) => {
  //         return (async () => {
  //           if (
  //             req.body.stationId &&
  //             typeof req.body.stationId === 'string'
  //           ) {
  //             const st = await Station.findByPk(req.body.stationId);
  //             if (!st) throw new Error('coudnt find station');
  //             await supplimentData.setStation(st);
  //           }
  //           return successResponse(
  //             'create suppliment successfull',
  //             supplimentData,
  //             res
  //           );
  //         })();
  //       })
  //       .catch((err) => dbError(err, res));
  //   } else {
  //     insufficientParameters(res);
  //   }
  // }

  // TODO: you may need to activate paranoid or custom isdeleted scope

  public static deleteSuppliment(req: Request, res: Response) {
    if (req.body.id) {
      const supplimentFilter = { where: { id: req.body.id } };
      Suppliment.findOne(supplimentFilter)
        .then((supplimentData) => {
          if (!supplimentData) throw new Error('cant find suppliment');
          return supplimentData.destroy();
        })
        .catch((err) => dbError(err, res));
    } else {
      insufficientParameters(res);
    }
  }

  public static getSuppliments(req: Request, res: Response) {
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
    const options: FindOptions<import('../../../db/models/products/suppliment/type').Suppliment> = {
      limit,
      offset,
      include: [],
    };
    if (req.query.incInvItem === 'true')
      (<Includeable[]>options.include).push({ model: InvItem });
    if (!(req.body.all === true)) options.where = { toBeArchived: false };
    Suppliment.findAll(options)
      .then((supplimentsData) =>
        successResponse('users retrieved', supplimentsData, res)
      )
      .catch((err) => failureResponse('couldnt retrieve users', err, res));
  }
}
