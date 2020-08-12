import { Application, Request, Response } from 'express';

export default class CommonRoutes {
  // eslint-disable-next-line class-methods-use-this
  public route(app: Application) {
    app.all('*', (req: Request, res: Response) => {
      res.status(404).send({ error: true, message: 'check your url please' });
    });
  }
}
