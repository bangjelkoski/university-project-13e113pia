import { Injectable } from '@angular/core';
import { StorageService } from './../storage/storage.service';
import { Role } from 'src/types';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private storageService: StorageService,
    private toast: ToastrService,
    private router: Router
  ) {}

  /** TODO */
  async login({ username, password, rememberMe }) {
    const korisnik = {
      username: 'bojan',
      email: 'bojan@example.com',
      firstName: 'Bojan',
      lastName: 'Angjelkoski',
      avatar: '/assets/static/images/avatar.png',
      role: Role.admin,
    };

    this.storageService.set('korisnik', korisnik);
    this.toast.success('Успешна најава.');
    this.router.navigate([korisnik.role]);
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
