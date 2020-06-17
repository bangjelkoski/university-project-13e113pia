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

  constructor(private router: Router, private formBuilder: FormBuilder) {
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

    this.registerForm = this.formBuilder.group(
      {
        username: this.username,
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

  onSubmit() {
    //
  }
}
