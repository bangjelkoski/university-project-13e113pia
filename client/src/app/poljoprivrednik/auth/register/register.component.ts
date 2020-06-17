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

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm: FormGroup;

  username: FormControl;
  dateOfBirth: FormControl;
  firstName: FormControl;
  lastName: FormControl;
  placeOfBirth: FormControl;
  phone: FormControl;
  email: FormControl;
  password: FormControl;
  passwordConfirmation: FormControl;

  constructor(private router: Router, private formBuilder: FormBuilder) {
    this.username = new FormControl('', [Validators.required]);
    this.firstName = new FormControl('', [Validators.required]);
    this.lastName = new FormControl('', [Validators.required]);
    this.placeOfBirth = new FormControl('', [Validators.required]);
    this.dateOfBirth = new FormControl('', [Validators.required]);
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

    this.registerForm = this.formBuilder.group(
      {
        username: this.username,
        phone: this.phone,
        dateOfBirth: this.dateOfBirth,
        placeOfBirth: this.placeOfBirth,
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

  onSubmit() {
    //
  }
}
