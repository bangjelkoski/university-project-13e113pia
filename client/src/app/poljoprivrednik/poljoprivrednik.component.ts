import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { ViewService } from '../services/view/view.service';
import { PoljoprivrednikService } from '../services/poljoprivrednik/poljoprivrednik.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-poljoprivrednik',
  templateUrl: './poljoprivrednik.component.html',
  styleUrls: ['./poljoprivrednik.component.scss'],
})
export class PoljoprivrednikComponent implements OnInit {
  navOpen: boolean = false;
  userOpen: boolean = false;

  korisnik: any = {};

  rasadnici = [];

  constructor(
    private authService: AuthService,
    public viewService: ViewService,
    private toastr: ToastrService,
    private poljoprivrednikService: PoljoprivrednikService
  ) {
    this.korisnik = this.authService.korisnik();
  }

  async ngOnInit() {
    this.rasadnici = await this.poljoprivrednikService.getRasadnici();
    this.showAlertIfNeeded();
  }

  showAlertIfNeeded() {
    const result = this.rasadnici.find((rasadnik) => {
      return rasadnik.temperature <= 12 || rasadnik.waterLevel <= 75;
    });

    if (result) {
      return this.toastr.error(
        `Расадник ${result.name} захтева одржавање`,
        'Пажња!',
        { closeButton: false, tapToDismiss: false, disableTimeOut: true }
      );
    }
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
