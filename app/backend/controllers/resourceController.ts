import { Request, Response } from 'express';
import {
  insufficientParameters,
  dbError,
  successResponse,
} from './common/service';
import { Resource } from '../db/models';
import { ResourceCreationAttributes } from '../db/models/resource/type';

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
    if (req.query.id || req.query.resource_name) {
      const filter = req.query.id
        ? { id: req.query.id }
        : { name: req.query.resource_name };
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
    if (req.query.id) {
      const resourceFilter = { where: { id: req.query.id } };
      Resource.findOne(resourceFilter)
        .then((resourceData) => resourceData?.destroy())
        .catch((err) => dbError(err, res));
    } else {
      insufficientParameters(res);
    }
  }
}
