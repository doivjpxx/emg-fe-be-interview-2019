import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { map ,  take } from 'rxjs/operators';
import { AuthService } from '../core';

@Injectable()
export class NoAuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private _authService: AuthService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {

    return this._authService.isAuthenticated.pipe(take(1), map(isAuth => !isAuth));

  }
}
