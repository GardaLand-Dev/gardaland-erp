import { Request, Response } from 'express';
import { FindOptions, Includeable } from 'sequelize/types';
import { ClientCreationAttributes } from '../../../db/models/clients/client/type';
import {
  successResponse,
  dbError,
  insufficientParameters,
  failureResponse,
} from '../../common/service';
import { DEFAULT_LIMIT, Client, Invoice, Order } from '../../../db/models';

export default class ClientController {
  public static createClient(req: Request, res: Response) {
    if (
      req.body.firstname &&
      typeof req.body.firstname === 'string' &&
      req.body.lastname &&
      typeof req.body.lastname === 'string'
    ) {
      const clientParams: ClientCreationAttributes = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
      };
      if (req.body.tel && typeof req.body.tel) clientParams.tel = req.body.tel;
      if (req.body.email && typeof req.body.email)
        clientParams.email = req.body.email;
      Client.create(clientParams)
        .then((clientData) =>
          successResponse('create client successfull', clientData, res)
        )
        .catch((err) => dbError(err, res));
    } else {
      insufficientParameters(res);
    }
  }

  public static getClient(req: Request, res: Response) {
    if (req.query.id && typeof req.query.id === 'string') {
      const filter = { id: req.query.id };
      const clientFilter = { where: filter };
      Client.findOne(clientFilter)
        .then((clientData) =>
          successResponse('get client successfull', clientData, res)
        )
        .catch((err) => dbError(err, res));
    } else {
      insufficientParameters(res);
    }
  }

  public static updateClient(req: Request, res: Response) {
    if (req.body.id && typeof req.body.id === 'string') {
      const filter = { id: req.body.id };
      const clientFilter = { where: filter };
      Client.findOne(clientFilter)
        .then(async (clientData) => {
          if (!clientData) throw new Error("couldn't find client");
          const clientParams: ClientCreationAttributes = {
            firstname:
              req.body.firstname && typeof req.body.firstname === 'string'
                ? req.body.firstname
                : clientData.firstname,
            lastname:
              req.body.lastname && typeof req.body.lastname === 'string'
                ? req.body.lastname
                : clientData.lastname,
            email:
              req.body.email && typeof req.body.email === 'string'
                ? req.body.email
                : clientData.email,
            tel: req.body.tel ? req.body.tel : clientData.tel,
          };
          clientData.setAttributes(clientParams);
          return clientData.save();
        })
        .then((clientData) =>
          successResponse('client update sucessful', clientData, res)
        )
        .catch((err) => dbError(err, res));
    } else {
      insufficientParameters(res);
    }
  }

  // TODO: you may need to activate paranoid or custom isdeleted scope
  public static deleteClient(req: Request, res: Response) {
    if (req.body.id) {
      const clientFilter = { where: { id: req.body.id } };
      Client.findOne(clientFilter)
        .then((clientData) => {
          return clientData.destroy();
        })
        .catch((err) => dbError(err, res));
    } else {
      insufficientParameters(res);
    }
  }

  public static getClients(req: Request, res: Response) {
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
    const options: FindOptions<import('../../../db/models/clients/client/type').Client> = {
      limit,
      offset,
      include: [],
    };
    if (req.body.all === 'true') {
      options.limit = null;
      options.offset = null;
    }
    if (req.query.incOrders === 'true')
      (<Includeable[]>options.include).push(Order);
    // if (req.query.ingredient === 'true') options.where = { isIngredient: true };
    Client.findAll(options)
      .then((clientsData) =>
        successResponse('Clients retrieved', clientsData, res)
      )
      .catch((err) => failureResponse('couldnt retrieve Clients', err, res));
  }
}
