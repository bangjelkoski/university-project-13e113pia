import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DemoService } from '../../services/demo/demo.service';
import { Router } from '@angular/router';
import { PASSWORD_REGEX } from 'src/utils/validators/password';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'div[app-login]',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent {
  loginForm: FormGroup;

  username: FormControl;
  password: FormControl;
  rememberMe: FormControl;

  constructor(
    public demoService: DemoService,
    private authService: AuthService,
    private router: Router
  ) {
    this.username = new FormControl('', Validators.required);
    this.password = new FormControl('', [
      Validators.required,
      Validators.pattern(PASSWORD_REGEX),
    ]);
    this.rememberMe = new FormControl(false);

    this.loginForm = new FormGroup({
      username: this.username,
      password: this.password,
      rememberMe: this.rememberMe,
    });
  }

  onGoToForgotPassword() {
    this.router.navigate(['auth/password']);
  }

  onGoToRegisterAsPreduzece() {
    this.router.navigate(['auth/preduzece/register']);
  }

  onGoToRegisterAsPoljoprivrednik() {
    this.router.navigate(['auth/poljoprivrednik/register']);
  }

  async onSubmit() {
    await this.authService.login({
      username: this.username.value,
      password: this.password.value,
      rememberMe: this.rememberMe.value,
    });
  }
}
