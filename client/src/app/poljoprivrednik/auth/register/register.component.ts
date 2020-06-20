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
import { PHONE_REGEX } from 'src/utils/validators/phone';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm: FormGroup;

  username: FormControl;
  birthDate: FormControl;
  firstName: FormControl;
  lastName: FormControl;
  birthPlace: FormControl;
  phone: FormControl;
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
    this.firstName = new FormControl('', [Validators.required]);
    this.lastName = new FormControl('', [Validators.required]);
    this.birthPlace = new FormControl('', [Validators.required]);
    this.birthDate = new FormControl('', [Validators.required]);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.phone = new FormControl('', [
      Validators.required,
      Validators.pattern(PHONE_REGEX),
    ]);
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
        phone: this.phone,
        birthDate: this.birthDate,
        birthPlace: this.birthPlace,
        firstName: this.firstName,
        lastName: this.lastName,
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
    await this.authService.registerPoljoprivrednik({
      username: this.username.value,
      phone: this.phone.value,
      birthDate: this.birthDate.value,
      birthPlace: this.birthPlace.value,
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      email: this.email.value,
      password: this.password.value,
    });
  }
}
