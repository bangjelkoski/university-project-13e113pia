import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { PASSWORD_REGEX } from 'src/utils/validators/password';
import { MustMatch, MustNotMatch } from 'src/utils/validators/MustMatch';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
})
export class PasswordComponent {
  resetForm: FormGroup;

  password: FormControl;
  username: FormControl;
  newPassword: FormControl;
  newPasswordConfirmation: FormControl;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.username = new FormControl('', Validators.required);
    this.password = new FormControl('', Validators.required);
    this.newPassword = new FormControl('', [
      Validators.required,
      Validators.pattern(PASSWORD_REGEX),
    ]);
    this.newPasswordConfirmation = new FormControl('', [Validators.required]);

    this.resetForm = this.formBuilder.group(
      {
        username: this.username,
        password: this.password,
        newPassword: this.newPassword,
        newPasswordConfirmation: this.newPasswordConfirmation,
      },
      {
        validator: [
          MustNotMatch('password', 'newPassword'),
          MustMatch('newPassword', 'newPasswordConfirmation'),
        ],
      }
    );
  }

  onGoToLogin() {
    this.router.navigate(['auth/login']);
  }

  async onSubmit() {
    await this.authService.reset({
      username: this.username.value,
      password: this.password.value,
      newPassword: this.newPassword.value,
    });
  }
}
