import { Router } from 'express';
import { UserRoute } from './UserRoute';

export class RootRoute {
  router: Router = Router();

  private _userRoute: UserRoute = new UserRoute();

  constructor() {
    this.routes();
  }

  public routes(): void {
    this.router.use('/user', this._userRoute.router);
  }
}
