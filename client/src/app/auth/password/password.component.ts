import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { PASSWORD_REGEX } from 'src/utils/password';
import { MustMatch } from 'src/utils/validators/MustMatch';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
})
export class PasswordComponent {
  resetForm: FormGroup;

  password: FormControl;
  newPassword: FormControl;
  newPasswordConfirmation: FormControl;

  constructor(private router: Router, private formBuilder: FormBuilder) {
    this.password = new FormControl('', Validators.required);
    this.newPassword = new FormControl('', [
      Validators.required,
      Validators.pattern(PASSWORD_REGEX),
    ]);
    this.newPasswordConfirmation = new FormControl('', [Validators.required]);

    this.resetForm = this.formBuilder.group(
      {
        password: this.password,
        newPassword: this.newPassword,
        newPasswordConfirmation: this.newPasswordConfirmation,
      },
      {
        validator: MustMatch('newPassword', 'newPasswordConfirmation'),
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
