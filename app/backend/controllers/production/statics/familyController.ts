import { Request, Response } from 'express';
import { FindOptions } from 'sequelize/types';
import { FamilyCreationAttributes } from '../../../db/models/family/type';
import {
  successResponse,
  dbError,
  insufficientParameters,
  failureResponse,
} from '../../common/service';
import { DEFAULT_LIMIT, Station, Family } from '../../../db/models';

export default class FamilyController {
  public static createFamily(req: Request, res: Response) {
    if (req.body.name && typeof req.body.name === 'string') {
      const familyParams: FamilyCreationAttributes = {
        name: (<string>req.body.name).normalize().toLowerCase(),
      };
      Family.create(familyParams)
        .then((familyData) => {
          return (async () => {
            if (req.body.stationId && typeof req.body.stationId === 'string') {
              const st = await Station.findByPk(req.body.stationId);
              if (!st) throw new Error('coudnt find station');
              await familyData.setStation(st);
            }
            return successResponse(
              'create family successfull',
              familyData,
              res
            );
          })();
        })
        .catch((err) => dbError(err, res));
    } else {
      insufficientParameters(res);
    }
  }

  public static getFamily(req: Request, res: Response) {
    if (
      (req.body.id && typeof req.body.id === 'string') ||
      (req.body.name && typeof req.body.name === 'string')
    ) {
      const filter = req.body.id
        ? { id: req.body.id }
        : {
            name: (<string>req.body.name).normalize().toLowerCase(),
          };
      const familyFilter = { where: filter };
      Family.findOne(familyFilter)
        .then((familyData) =>
          successResponse('get family successfull', familyData, res)
        )
        .catch((err) => dbError(err, res));
    } else {
      insufficientParameters(res);
    }
  }

  public static updateFamily(req: Request, res: Response) {
    if (
      (req.body.id && typeof req.body.id === 'string') ||
      (req.body.name && typeof req.body.name === 'string')
    ) {
      const filter = req.body.id
        ? { id: req.body.id }
        : {
            name: (<string>req.body.name).normalize().toLowerCase(),
          };
      const familyFilter = { where: filter };
      Family.findOne(familyFilter)
        .then((familyData) => {
          if (!familyData) throw new Error("couldn't find family");
          const familyParams: FamilyCreationAttributes = {
            name: req.body.name
              ? (<string>req.body.name).normalize().toLowerCase()
              : familyData.name,
          };
          familyData.setAttributes(familyParams);
          return familyData.save();
        })
        .then((familyData) => {
          return (async () => {
            if (req.body.stationId && typeof req.body.stationId === 'string') {
              const st = await Station.findByPk(req.body.stationId);
              if (!st) throw new Error('coudnt find station');
              await familyData.setStation(st);
            }
            return successResponse(
              'create family successfull',
              familyData,
              res
            );
          })();
        })
        .catch((err) => dbError(err, res));
    } else {
      insufficientParameters(res);
    }
  }

  // TODO: you may need to activate paranoid or custom isdeleted scope
  public static deleteFamily(req: Request, res: Response) {
    if (req.body.id) {
      const familyFilter = { where: { id: req.body.id } };
      Family.findOne(familyFilter)
        .then((familyData) => {
          if (!familyData) throw new Error('cant find family');
          return familyData.destroy();
        })
        .catch((err) => dbError(err, res));
    } else {
      insufficientParameters(res);
    }
  }

  public static getFamilies(req: Request, res: Response) {
    const limit =
      req.body.limit && req.body.limit > 0 ? req.body.limit : DEFAULT_LIMIT;
    const offset =
      req.body.page && req.body.page > 0 ? (req.body.page - 1) * limit : 0;
    const options: FindOptions<import('../../../db/models/family/type').Family> = {
      limit,
      offset,
    };
    Family.findAll(options)
      .then((familiesData) =>
        successResponse('users retrieved', familiesData, res)
      )
      .catch((err) => failureResponse('couldnt retrieve users', err, res));
  }
}
