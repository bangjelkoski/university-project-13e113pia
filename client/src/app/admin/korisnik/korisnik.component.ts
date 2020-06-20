import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin/admin.service';
import { ViewService } from 'src/app/services/view/view.service';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { PHONE_REGEX } from 'src/utils/validators/phone';
import { PASSWORD_REGEX } from 'src/utils/validators/password';
import { MustMatch } from 'src/utils/validators/MustMatch';

@Component({
  selector: 'app-korisnik',
  templateUrl: './korisnik.component.html',
  styleUrls: ['./korisnik.component.scss'],
})
export class KorisnikComponent implements OnInit {
  korisnik;

  updateForm: FormGroup;

  username: FormControl;
  phone: FormControl;
  email: FormControl;
  password: FormControl;
  passwordConfirmation: FormControl;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    public viewService: ViewService
  ) {
    this.viewService.setTitle('Измена Корисника');

    this.username = new FormControl('', [Validators.required]);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.phone = new FormControl('', [Validators.pattern(PHONE_REGEX)]);
    this.password = new FormControl('');
    this.passwordConfirmation = new FormControl('');

    this.updateForm = this.formBuilder.group(
      {
        username: this.username,
        phone: this.phone,
        email: this.email,
        password: this.password,
        passwordConfirmation: this.passwordConfirmation,
      },
      {
        validator: MustMatch('password', 'passwordConfirmation'),
      }
    );
  }

  async ngOnInit() {
    await this.getKorisnik(this.route.snapshot.paramMap.get('id'));
    this.setPasswordValidation();
  }

  setPasswordValidation() {
    this.password.valueChanges.subscribe((password) => {
      if (password) {
        this.password.setValidators([
          Validators.required,
          Validators.pattern(PASSWORD_REGEX),
        ]);
        this.passwordConfirmation.setValidators([Validators.required]);
      } else {
        this.password.setValidators(null);
        this.passwordConfirmation.setValidators(null);
      }
    });
  }

  async getKorisnik(id) {
    this.korisnik = await this.adminService.getKorisnik(id);
    this.username.setValue(this.korisnik.username);
    this.email.setValue(this.korisnik.email);
    this.phone.setValue(this.korisnik.phone);
    this.viewService.setTitle(`Измена Корисника - ${this.korisnik.username}`);
  }

  async onSubmit() {
    await this.adminService.updateKorisnik({
      id: this.korisnik.id,
      username: this.username.value,
      password: this.password.value,
      phone: this.phone.value,
      email: this.email.value,
      role: this.korisnik.role,
    });
  }
}
