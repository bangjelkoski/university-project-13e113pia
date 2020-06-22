import { Component, OnInit } from '@angular/core';
import { PoljoprivrednikService } from 'src/app/services/poljoprivrednik/poljoprivrednik.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ViewService } from 'src/app/services/view/view.service';

@Component({
  selector: 'app-poljoprivrednik-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  korisnik;

  rasadnici = [];

  constructor(
    private authService: AuthService,
    private poljoprivrednikService: PoljoprivrednikService,
    public viewService: ViewService
  ) {
    this.viewService.setTitle('Почетна');
    this.korisnik = this.authService.korisnik();
  }

  async ngOnInit() {
    const rasadnici = await this.poljoprivrednikService.getRasadnici();

    this.rasadnici = rasadnici.map((rasadnik) => {
      return {
        ...rasadnik,
        brSlobodnihSadnika:
          rasadnik.width * rasadnik.length - rasadnik.Sadnici.length,
      };
    });
  }
}
