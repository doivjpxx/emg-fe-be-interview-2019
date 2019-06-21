import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { BehaviorSubject, ReplaySubject, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { IUser } from '../models/user.model';
import { User } from '../../shared/constants/api.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject = new BehaviorSubject<IUser>({} as IUser);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();


  constructor(
    private _apiService: ApiService,
    private _jwtService: JwtService
  ) { }

  populate() {
    if (this._jwtService.getToken()) {
      this._apiService.get(User.Me)
      .subscribe(
        data => {
          console.log(data);
          this.setAuth(data.data);
        },
        err => this.purgeAuth()
      );
    } else {
      this.purgeAuth();
    }
  }

  setAuth(user: IUser) {
    this._jwtService.saveToken(user.token);
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    this._jwtService.destroyToken();
    this.currentUserSubject.next({} as IUser);
    this.isAuthenticatedSubject.next(false);
  }

  login(credentials): Observable<IUser> {
    return this._apiService.post(User.Login, credentials)
      .pipe(map(
      data => {
        this.setAuth(data.data);
        return data;
      }
    ));
  }

  register(credentials): Observable<IUser> {
    return this._apiService.post(User.Register, credentials)
      .pipe(map(
        data => data
      ));
  }

  getCurrentUser(): IUser {
    return this.currentUserSubject.value;
  }
}
