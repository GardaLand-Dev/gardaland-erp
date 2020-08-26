import { Request, Response } from 'express';
import { FindOptions } from 'sequelize/types';
import { StationCreationAttributes } from '../../../db/models/station/type';
import { Station, DEFAULT_LIMIT } from '../../../db/models';
import {
  successResponse,
  dbError,
  insufficientParameters,
  failureResponse,
} from '../../common/service';

export default class StationController {
  public static createStation(req: Request, res: Response) {
    if (
      req.body.name &&
      req.body.printerName &&
      typeof req.body.name === 'string' &&
      typeof req.body.printerName === 'string'
    ) {
      const stationParams: StationCreationAttributes = {
        name: (<string>req.body.name).normalize().toLowerCase(),
        printer: (<string>req.body.printerName).normalize().toLowerCase(),
      };
      Station.create(stationParams)
        .then((stationData) =>
          successResponse('create station successfull', stationData, res)
        )
        .catch((err) => {
          console.log(err);
          dbError(err, res);
        });
    } else {
      insufficientParameters(res);
    }
  }

  public static getStation(req: Request, res: Response) {
    if (
      (req.body.id && typeof req.body.id === 'string') ||
      (req.body.name && typeof req.body.name === 'string')
    ) {
      const filter = req.body.id
        ? { id: req.body.id }
        : {
            name: (<string>req.body.name).normalize().toLowerCase(),
          };
      const stationFilter = { where: filter };
      Station.findOne(stationFilter)
        .then((stationData) => {
          if (!stationData) throw new Error('coudnt find station');
          return successResponse('get station successfull', stationData, res);
        })
        .catch((err) => dbError(err, res));
    } else {
      insufficientParameters(res);
    }
  }

  public static updateStation(req: Request, res: Response) {
    if (
      (req.body.id && typeof req.body.id === 'string') ||
      (req.body.name && typeof req.body.name === 'string')
    ) {
      const filter = req.body.id
        ? { id: req.body.id }
        : {
            name: (<string>req.body.name).normalize().toLowerCase(),
          };
      const stationFilter = { where: filter };
      Station.findOne(stationFilter)
        .then((stationData) => {
          if (!stationData) throw new Error("couldn't find station");
          const stationParams: StationCreationAttributes = {
            name: req.body.name
              ? (<string>req.body.name).normalize().toLowerCase()
              : stationData.name,
            printer:
              req.body.printerName && typeof req.body.printerName === 'string'
                ? (<string>req.body.printerName).normalize().toLowerCase()
                : stationData.printer,
          };
          stationData.setAttributes(stationParams);
          return stationData.save();
        })
        .then((stationData) =>
          successResponse('station update sucessful', stationData, res)
        )
        .catch((err) => dbError(err, res));
    } else {
      insufficientParameters(res);
    }
  }

  // TODO: you may need to activate paranoid or custom isdeleted scope
  public static deleteStation(req: Request, res: Response) {
    if (req.body.id) {
      const stationFilter = { where: { id: req.body.id } };
      Station.findOne(stationFilter)
        .then((stationData) => {
          if (!stationData) throw new Error('cant find station');
          return stationData.destroy();
        })
        .catch((err) => dbError(err, res));
    } else {
      insufficientParameters(res);
    }
  }

  public static getStations(req: Request, res: Response) {
    const limit =
      req.body.limit && req.body.limit > 0 ? req.body.limit : DEFAULT_LIMIT;
    const offset =
      req.body.page && req.body.page > 0 ? (req.body.page - 1) * limit : 0;
    const options: FindOptions<import('../../../db/models/station/type').Station> = {
      limit,
      offset,
    };
    Station.findAll(options)
      .then((stationsData) =>
        successResponse('users retrieved', stationsData, res)
      )
      .catch((err) => failureResponse('couldnt retrieve users', err, res));
  }
}
