import { Component, OnInit } from '@angular/core';
import { IUser } from '../../../core/models/user.model';
import { AuthService } from '../../../core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  currentUser: IUser;

  constructor(private _authService: AuthService,
              private _router: Router) {}

  ngOnInit() {
    this._authService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
      }
    );
  }

  logout() {
    this._authService.purgeAuth();
    this._router.navigateByUrl('/');
  }
}
