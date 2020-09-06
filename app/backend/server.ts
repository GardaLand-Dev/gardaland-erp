import express from 'express';
import log from 'electron-log';
import bodyParser from 'body-parser';
import { dbInit } from './db/models';
import authCheck, { notAuthHandler } from './middlewares/authCheck';
import { rbacInit } from './middlewares/rbac';

import TestRoutes from './routes/test_route';
import CommonRoutes from './routes/common_routes';
import RBACRoutes from './routes/rbac_routes';
import LoginRoute from './routes/login_route';
import ProductionRoutes from './routes/production_routes';

class Server {
  public app: express.Application;

  private test_routes: TestRoutes;

  private common_routes: CommonRoutes;

  constructor() {
    // init
    console.time('rbac');
    rbacInit(dbInit);
    process.env.PRIVATE_KEY = 'yasser9999';
    this.test_routes = new TestRoutes();
    this.common_routes = new CommonRoutes();
    this.app = express();
    this.config();
  }

  private config(): void {
    this.app.use(/\/((?!api\/thumbnail).)*/, bodyParser.json());
    this.app.use(
      /\/((?!api\/thumbnail).)*/,
      bodyParser.urlencoded({ extended: true })
    );
    this.app.use((req, _res, next) => {
      log.info(
        `${req.method}: ${req.path} body is`,
        req.body,
        '\nquery params are',
        req.query
      );
      // console.log(
      //   `${req.method}: ${req.path} body is`,
      //   req.body,
      //   '\nquery params are',
      //   req.query
      // );
      next();
    }); // for debuging
    this.app.use(authCheck);
    this.app.use(notAuthHandler);
    this.test_routes.route(this.app);
    LoginRoute.route(this.app);
    RBACRoutes.route(this.app);
    ProductionRoutes.route(this.app);
    // this.common_routes.route(this.app);
  }
}
export default new Server().app;
// export default new Server().app;
