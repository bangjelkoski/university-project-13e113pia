import { Injectable } from '@angular/core';
import { StorageService } from './../storage/storage.service';
import { Role, Status } from 'src/types';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private httpService: HttpService,
    private storageService: StorageService,
    private toast: ToastrService,
    private router: Router
  ) {}

  async login({ username, password, rememberMe }) {
    let korisnik;

    try {
      korisnik = await this.httpService.post('auth/login', {
        username,
        password,
        // rememberMe,
      });
    } catch (error) {
      return this.toast.error(error.message);
    }

    if (korisnik.status === Status.naCekanju) {
      return this.toast.warning('Ваш кориснички налог још није активан');
    }

    if (korisnik.status === Status.odbijen) {
      return this.toast.error('Ваш кориснички налог је одбијен');
    }

    this.storageService.set('korisnik', korisnik);
    this.toast.success('Успешна најава.');
    this.router.navigate([korisnik.role]);
  }

  async reset({ username, password, newPassword }) {
    try {
      await this.httpService.post('auth/reset', {
        username,
        password,
        newPassword,
      });
    } catch (error) {
      return this.toast.error(error.message);
    }

    this.toast.success('Успешна промена лозинке.');
    this.router.navigate(['/auth/login']);
  }

  async captcha(token: string) {
    try {
      await this.httpService.post('auth/captcha', {
        token,
      });
    } catch (error) {
      throw new Error('Верификација није успела.');
    }
  }

  async registerPreduzece({
    username,
    dateOfCreation,
    location,
    name,
    email,
    password,
  }) {
    try {
      await this.httpService.post('auth/register/preduzece', {
        username,
        dateOfCreation,
        location,
        name,
        email,
        password,
      });
    } catch (error) {
      return this.toast.error(error.message);
    }

    this.toast.success(
      'Успешна регистрација. Пре него што се можете најавити на систем Администратор мора одобрити вашу регистрацију.'
    );
    this.router.navigate(['/auth/login']);
  }

  async registerPoljoprivrednik({
    username,
    phone,
    birthPlace,
    birthDate,
    firstName,
    lastName,
    email,
    password,
  }) {
    try {
      await this.httpService.post('auth/register/poljoprivrednik', {
        username,
        phone,
        birthPlace,
        birthDate,
        firstName,
        lastName,
        email,
        password,
      });
    } catch (error) {
      return this.toast.error(error.message);
    }

    this.toast.success(
      'Успешна регистрација. Пре него што се можете најавити на систем Администратор мора одобрити вашу регистрацију.'
    );
    this.router.navigate(['/auth/login']);
  }

  async logout() {
    this.toast.success('Успешна одјава.');
    this.storageService.remove('korisnik');
  }

  loggedIn() {
    return this.storageService.has('korisnik');
  }

  korisnik() {
    return this.storageService.get('korisnik');
  }
}
