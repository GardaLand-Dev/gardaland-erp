import express from 'express';
import bodyParser from 'body-parser';
import TestRoutes from './routes/test_route';
import CommonRoutes from './routes/common_routes';
import UserRoute from './routes/user_route';
// import sqlite3 from '@journeyapps/sqlcipher';

export class Server {
  public app: express.Application;

  private test_routes: TestRoutes;

  private common_routes: CommonRoutes;

  // private user_route: UserRoute;

  // private db: sqlite3.default;

  constructor() {
    this.test_routes = new TestRoutes();
    this.common_routes = new CommonRoutes();
    // this.user_route = new UserRoute();
    this.app = express();
    this.config();
    this.test_routes.route(this.app);
    UserRoute.route(this.app);
    this.common_routes.route(this.app);
  }

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }
}

export default new Server().app;
// const app: express.Application = express.default();
// const port = 3333;

// export default function startServer() {
//   app.get('/', (_req: unknown, res: { send: (arg0: string) => void }) => {
//     res.send('Hello World!');
//   });

//   app.listen(port, () => {
//     // eslint-disable-next-line no-console
//     console.log(`Example app listening at http://localhost:${port}`);
//   });
// }
