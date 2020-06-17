import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DemoService } from '../../services/demo/demo.service';
import { Router } from '@angular/router';
import { PASSWORD_REGEX } from 'src/utils/validators/password';

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

  constructor(public demoService: DemoService, private router: Router) {
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

  onGoToRegisterAsPreduzetnik() {
    this.router.navigate(['auth/preduzetnik/register']);
  }

  onGoToRegisterAsPoljoprivrednik() {
    this.router.navigate(['auth/poljoprivrednik/register']);
  }

  onSubmit() {
    //
  }
}
