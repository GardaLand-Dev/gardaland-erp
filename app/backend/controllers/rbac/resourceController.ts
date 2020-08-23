import { Request, Response } from 'express';
import {
  insufficientParameters,
  dbError,
  successResponse,
  failureResponse,
} from '../common/service';
import { Resource, DEFAULT_LIMIT } from '../../db/models';
import { ResourceCreationAttributes } from '../../db/models/resource/type';

export default class ResourceController {
  public static createResource(req: Request, res: Response) {
    if (req.body.resource_name) {
      const resourceParams: ResourceCreationAttributes = {
        name: req.body.resource_name,
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
    if (req.body.id || req.body.resource_name) {
      const filter = req.body.id
        ? { id: req.body.id }
        : { name: req.body.resource_name };
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
    if (req.body.id || req.body.resource_name) {
      const resourceFilter = req.body.id
        ? { where: { id: req.body.id } }
        : { where: { name: req.body.resource_name } };
      Resource.findOne(resourceFilter)
        .then((resourceData) => {
          if (!resourceData) throw new Error("couldn't find resource");
          const resourceParams: ResourceCreationAttributes = {
            id: resourceData?.id,
            name: req.body.resource_name
              ? req.body.resource_name
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
      req.body.limit && req.body.limit > 0 ? req.body.limit : DEFAULT_LIMIT;
    const offset =
      req.body.page && req.body.page > 0 ? (req.body.page - 1) * limit : 0;
    const options = { limit, offset };
    Resource.findAll(options)
      .then((resourcesData) =>
        successResponse('users retrieved', resourcesData, res)
      )
      .catch((err) => failureResponse('couldnt retrieve users', err, res));
  }
}
