import { Response } from 'express';

enum ResponseStatusCodes {
  success = 200,
  bad_request = 400,
  unauthorized = 401,
  internal_server_error = 500,
}

export function successResponse(message: string, DATA: unknown, res: Response) {
  return res.status(ResponseStatusCodes.success).json({
    STATUS: 'SUCCESS',
    MESSAGE: message,
    DATA,
  });
}

export function failureResponse(message: string, DATA: unknown, res: Response) {
  return res.status(ResponseStatusCodes.success).json({
    STATUS: 'FAILURE',
    MESSAGE: message,
    DATA,
  });
}

export function insufficientParameters(res: Response) {
  return res.status(ResponseStatusCodes.bad_request).json({
    STATUS: 'FAILURE',
    MESSAGE: 'Insufficient parameters',
    DATA: {},
  });
}

export function unauthorizedRequest(
  res: Response,
  msg = 'Unauthorized Access'
) {
  return res.status(ResponseStatusCodes.unauthorized).json({
    STATUS: 'FAILURE',
    MESSAGE: msg,
    DATA: {},
  });
}

export function dbError(err: Error, res: Response) {
  // eslint-disable-next-line no-console
  console.log(err); // debug
  return res.status(ResponseStatusCodes.internal_server_error).json({
    STATUS: 'FAILURE',
    MESSAGE: 'SQLITE error',
    DATA: err.message,
  });
}
