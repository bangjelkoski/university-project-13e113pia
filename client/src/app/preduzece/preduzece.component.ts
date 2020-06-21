import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { ViewService } from '../services/view/view.service';

@Component({
  selector: 'app-preduzece',
  templateUrl: './preduzece.component.html',
  styleUrls: ['./preduzece.component.scss'],
})
export class PreduzeceComponent {
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
