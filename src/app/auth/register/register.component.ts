import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { BasePage } from '../../shared/base';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent extends BasePage implements OnInit {

  registerForm: FormGroup;

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
    this.registerForm = this._fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      name: ['', [Validators.required]],
      phone: ['', [Validators.required]]
    });
  }

  submit() {
    const sub = this._authService.register(this.registerForm.value).subscribe(
      data => {
        alert('Đăng ký thành công!');
        this._router.navigate(['/login']);
      }
    );
    this.subscriptions.push(sub);
  }
}
