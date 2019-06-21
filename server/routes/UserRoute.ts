import { UserController } from '../controllers/UserController';
import { Router } from 'express';
import VerifyToken from '../middlewares/VerifyToken';

export class UserRoute {

  router: Router = Router();
  verifyToken: VerifyToken = new VerifyToken();

  private userController: UserController = new UserController();

  constructor() {
    this.routes();
  }

  public routes(): void {
    this.router.post('/register', this.userController.register);
    this.router.post('/login', this.userController.login);
    this.router.get('/me', this.verifyToken.verifyToken, this.userController.detail);
  }
}
