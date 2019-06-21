import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../core';
import { Router } from '@angular/router';
import { BasePage } from '../../shared/base';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent extends BasePage implements OnInit {
  loginForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router
  ) {
    super();
  }

  ngOnInit() {
    this._initForm();
  }

  private _initForm() {
    this.loginForm = this._fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    const sub = this._authService.login(this.loginForm.value).subscribe(
      data => this._router.navigateByUrl('/'),
      err => alert('Sai tài khoản hoặc mật khẩu')
    );
    this.subscriptions.push(sub);
  }

}
