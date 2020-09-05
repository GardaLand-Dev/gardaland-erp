import ejwt from 'express-jwt';
import { Request, Response, NextFunction } from 'express';
import { unauthorizedRequest } from '../controllers/common/service';

const reqProp = 'auth';

const config = {
  secret: 'yasser9999',
  algorithms: ['HS256'], // use RS256 for asymmetric algorithm
  requestProperty: reqProp,
};

export interface JwtRequest extends Request {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [reqProp]?: {
    id: string;
  };
}

export default ejwt(config).unless({
  path: ['/token', '/api/login'],
});

export const notAuthHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    err.name === 'UnauthorizedError' &&
    !(req.path.endsWith('/token') || req.path.endsWith('/api/login'))
  ) {
    unauthorizedRequest(res);
  } else next();
};

// TODO: see this https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs
// TODO: https://jasonwatmore.com/post/2017/12/07/react-redux-jwt-authentication-tutorial-example
