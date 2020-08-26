import { Request, Response } from 'express';
import { FindOptions } from 'sequelize/types';
import { SupplimentCreationAttributes } from '../../../db/models/suppliment/type';
import {
  successResponse,
  dbError,
  insufficientParameters,
  failureResponse,
} from '../../common/service';
import { DEFAULT_LIMIT, Suppliment } from '../../../db/models';

export default class SupplimentController {
  public static createSuppliment(req: Request, res: Response) {
    if (req.body.name && req.body.quantity && req.body.stockable_id) {
      const supplimentParams: SupplimentCreationAttributes = {
        name: (<string>req.body.name).normalize().toLowerCase(),
        quantity: req.body.quantity,
        stockableId: req.body.stockable_id,
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
    if (req.body.id || req.body.name) {
      const filter = req.body.id
        ? { id: req.body.id }
        : {
            name: (<string>req.body.name).normalize().toLowerCase(),
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
  //             req.body.station_id &&
  //             typeof req.body.station_id === 'string'
  //           ) {
  //             const st = await Station.findByPk(req.body.station_id);
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
      req.body.limit && req.body.limit > 0 ? req.body.limit : DEFAULT_LIMIT;
    const offset =
      req.body.page && req.body.page > 0 ? (req.body.page - 1) * limit : 0;
    const options: FindOptions<import('../../../db/models/suppliment/type').Suppliment> = {
      limit,
      offset,
    };
    Suppliment.findAll(options)
      .then((supplimentsData) =>
        successResponse('users retrieved', supplimentsData, res)
      )
      .catch((err) => failureResponse('couldnt retrieve users', err, res));
  }
}
