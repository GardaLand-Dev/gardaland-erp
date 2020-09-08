import { Request, Response } from 'express';
import {
  insufficientParameters,
  dbError,
  successResponse,
  failureResponse,
} from '../common/service';
import { Resource, DEFAULT_LIMIT } from '../../db/models';
import { ResourceCreationAttributes } from '../../db/models/rbac/resource/type';

export default class ResourceController {
  public static createResource(req: Request, res: Response) {
    if (req.body.resourceName) {
      const resourceParams: ResourceCreationAttributes = {
        name: req.body.resourceName,
      };
      Resource.create(resourceParams)
        .then((resourceData) =>
          successResponse('create resource successfull', resourceData, res)
        )
        .catch((err) => dbError(err, res));
    } else {
      insufficientParameters(res);
    }
  }

  public static getResource(req: Request, res: Response) {
    if (req.body.id || req.body.resourceName) {
      const filter = req.body.id
        ? { id: req.body.id }
        : { name: req.body.resourceName };
      const resourceFilter = { where: filter };
      Resource.findOne(resourceFilter)
        .then((resourceData) =>
          successResponse('get resource successfull', resourceData, res)
        )
        .catch((err) => dbError(err, res));
    } else {
      insufficientParameters(res);
    }
  }

  public static updateResource(req: Request, res: Response) {
    if (req.body.id || req.body.resourceName) {
      const resourceFilter = req.body.id
        ? { where: { id: req.body.id } }
        : { where: { name: req.body.resourceName } };
      Resource.findOne(resourceFilter)
        .then((resourceData) => {
          if (!resourceData) throw new Error("couldn't find resource");
          const resourceParams: ResourceCreationAttributes = {
            id: resourceData?.id,
            name: req.body.resourceName
              ? req.body.resourceName
              : resourceData?.name,
          };
          resourceData?.setAttributes(resourceParams);
          return resourceData.save();
        })
        .then((resourceData) =>
          successResponse('resource update sucessful', resourceData, res)
        )
        .catch((err) => dbError(err, res));
    } else {
      insufficientParameters(res);
    }
  }

  public static deleteResource(req: Request, res: Response) {
    if (req.body.id) {
      const resourceFilter = { where: { id: req.body.id } };
      Resource.findOne(resourceFilter)
        .then((resourceData) => resourceData?.destroy())
        .catch((err) => dbError(err, res));
    } else {
      insufficientParameters(res);
    }
  }

  public static getResources(req: Request, res: Response) {
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
    const options = { limit, offset };
    Resource.findAll(options)
      .then((resourcesData) =>
        successResponse('users retrieved', resourcesData, res)
      )
      .catch((err) => failureResponse('couldnt retrieve users', err, res));
  }
}
