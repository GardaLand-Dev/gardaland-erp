import { Application, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export default class TestRoutes {
  // eslint-disable-next-line class-methods-use-this
  public route(app: Application) {
    app.get('/api/test', (_req: Request, res: Response) => {
      res.status(200).json({ message: 'get request successful' });
    });

    app.post('/api/test', (_req: Request, res: Response) => {
      res.status(200).json({ message: 'post request successfull' });
    });

    app.get('/token', (req: Request, res: Response) => {
      res.status(200).json({
        token: jwt.sign('ADMIN', 'yasser9999', { algorithm: 'HS256' }),
      });
    });
  }
}
