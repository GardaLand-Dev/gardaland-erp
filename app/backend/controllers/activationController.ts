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
          return RestaurantCreds.create({
            id: jsonRespone.DATA.id,
            apikey: jsonRespone.DATA.apikey,
            hwid,
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
}
