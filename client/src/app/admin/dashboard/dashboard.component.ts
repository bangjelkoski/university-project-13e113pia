import { Component, OnInit } from '@angular/core';
import { ViewService } from 'src/app/services/view/view.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AdminService } from 'src/app/services/admin/admin.service';
import { Korisnik } from 'src/types';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  korisnik: any = {};

  korisniciNaCekanju: Array<Korisnik> = [];
  preduzeca: Array<Korisnik> = [];
  poljoprivrednici: Array<Korisnik> = [];

  constructor(
    private viewService: ViewService,
    private authService: AuthService,
    private adminService: AdminService
  ) {
    this.viewService.setTitle('Почетна');
    this.korisnik = this.authService.korisnik();
  }

  async ngOnInit() {
    this.korisniciNaCekanju = await this.adminService.getKorisniciNaCekanju();
    this.preduzeca = await this.adminService.getPreduzeca();
    this.poljoprivrednici = await this.adminService.getPoljoprivrednici();
  }

  getTotalKorisnici() {
    return this.poljoprivrednici.length + this.preduzeca.length;
  }

  getTotalPreduzeca() {
    return this.preduzeca.length;
  }

  getTotalPoljoprivrednici() {
    return this.poljoprivrednici.length;
  }

  onOdobren(id) {
    this.korisniciNaCekanju = this.korisniciNaCekanju.filter(
      (korisnik) => korisnik.id !== id
    );
  }

  onOdbijen(id) {
    this.korisniciNaCekanju = this.korisniciNaCekanju.filter(
      (korisnik) => korisnik.id !== id
    );
  }
}
