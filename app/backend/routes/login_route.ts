import { Application } from 'express';
import LoginController from '../controllers/loginController';

export default class LoginRoute {
  public static route(app: Application) {
    app.post('/api/login', LoginController.login);
  }
}
