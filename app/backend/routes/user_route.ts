import { Application } from 'express';
import UserController from '../controllers/userController';

export default class UserRoute {
  public static route(app: Application) {
    app.get('/api/user', UserController.getUser);

    app.post('/api/user', UserController.createUser);
  }
}
