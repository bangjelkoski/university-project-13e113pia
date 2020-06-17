import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { ViewService } from '../services/view/view.service';
import { Korisnik } from 'src/types';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  navOpen: boolean = false;
  userOpen: boolean = false;

  korisnik: any = {};

  constructor(
    private authService: AuthService,
    public viewService: ViewService
  ) {
    this.korisnik = this.authService.korisnik();
  }

  handleNavVisibilityToggle() {
    this.navOpen = !this.navOpen;
  }

  handleUserVisibilityToggle() {
    this.userOpen = !this.userOpen;
  }

  onLogout() {
    this.authService.logout();
  }
}
