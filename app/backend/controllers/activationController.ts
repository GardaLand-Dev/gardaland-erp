import { Request } from 'express';
import fetch, { Response } from 'node-fetch';
import { getHWID } from 'hwid';
import log from 'electron-log';
import { RestaurantCreds } from '../db/models';
import {
  failureResponse,
  successResponse,
  insufficientParameters,
} from './common/service';
import config from '../constants/config';

export default class LoginController {
  public static activate(req: Request, res: import('express').Response) {
    if (req.body.apikey) {
      // sending request to api
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ apikey: req.body.apikey }),
      };
      fetch(`${config.dashboardUrl}/api/restaurant`, requestOptions)
        .then((resp: Response) => {
          if (!resp.ok) throw new Error('invalid apikey');
          return resp.text();
        })
        .then(async (text) => {
          // id, apikey
          const jsonRespone = text && JSON.parse(text);
          const hwid = await getHWID();
          log.info({
            id: jsonRespone.DATA.id,
            apikey: jsonRespone.DATA.apikey,
            hwid,
          });
          return RestaurantCreds.findOrCreate({
            where: {
              id: jsonRespone.DATA.id,
            },
            defaults: {
              id: jsonRespone.DATA.id,
              apikey: jsonRespone.DATA.apikey,
              hwid,
            },
          });
        })
        .then(() => {
          return successResponse('activated successfully', true, res);
        })
        .catch((err) => {
          log.info('errror activating', err);
          failureResponse('cant activate', err, res);
        });
    } else insufficientParameters(res);
  }

  public static checkActivation(
    _req: Request,
    res: import('express').Response
  ) {
    RestaurantCreds.findOne()
      .then((credsData) => {
        if (!credsData) {
          return failureResponse('no activated yet', {}, res);
        }
        return successResponse('already activated', {}, res);
      })
      .catch((err) => failureResponse('not activated yet err', err, res));
  }
}
