import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { MustMatch } from 'src/utils/validators/MustMatch';
import { PASSWORD_REGEX } from 'src/utils/validators/password';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm: FormGroup;

  username: FormControl;
  dateOfCreation: FormControl;
  name: FormControl;
  location: FormControl;
  email: FormControl;
  password: FormControl;
  passwordConfirmation: FormControl;
  captcha: FormControl;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.username = new FormControl('', [Validators.required]);
    this.name = new FormControl('', [Validators.required]);
    this.location = new FormControl('', [Validators.required]);
    this.dateOfCreation = new FormControl('', [Validators.required]);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.pattern(PASSWORD_REGEX),
    ]);
    this.passwordConfirmation = new FormControl('', [Validators.required]);
    this.captcha = new FormControl('', [Validators.required]);

    this.registerForm = this.formBuilder.group(
      {
        username: this.username,
        captcha: this.captcha,
        dateOfCreation: this.dateOfCreation,
        location: this.location,
        name: this.name,
        email: this.email,
        password: this.password,
        passwordConfirmation: this.passwordConfirmation,
      },
      {
        validator: MustMatch('password', 'passwordConfirmation'),
      }
    );
  }

  onGoToLogin() {
    this.router.navigate(['auth/login']);
  }

  async onSubmit() {
    await this.authService.captcha(this.captcha.value);
    await this.authService.registerPreduzece({
      username: this.username.value,
      dateOfCreation: this.dateOfCreation.value,
      location: this.location.value,
      name: this.name.value,
      email: this.email.value,
      password: this.password.value,
    });
  }
}
