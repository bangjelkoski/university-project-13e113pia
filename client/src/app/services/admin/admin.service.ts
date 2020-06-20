import { Injectable, OnInit } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { HttpService } from '../http/http.service';
import { Status } from 'src/types';

@Injectable({
  providedIn: 'root',
})
export class AdminService implements OnInit {
  korisnici = [];
  poljoprivrednici = [];
  preduzeca = [];

  constructor(private httpService: HttpService) {}

  async ngOnInit() {
    this.korisnici = await this.getKorisnici();
    this.preduzeca = await this.getPreduzeca();
    this.poljoprivrednici = await this.getPoljoprivrednici();
  }

  async getTotalKorisnici() {
    const korisnici = await this.httpService.get('korisnici');

    return korisnici.length;
  }

  getTotalPreduzeca(): number {
    return this.preduzeca.length;
  }

  getTotalPoljoprivrednici(): number {
    return this.poljoprivrednici.length;
  }

  async getPendingKorisnici() {
    return this.korisnici.filter(({ status }) => status === Status.naCekanju);
  }

  async getPoljoprivrednici() {
    return this.httpService.get('poljoprivrednici');
  }

  async getKorisnici() {
    return this.httpService.get('korisnici');
  }

  async getPreduzeca() {
    return this.httpService.get('preduzeca');
  }

  async addPoljoprivrednik() {}

  async addPreduzetnik() {}

  async removeKorisnik(korisnik) {}

  async updatePoljoprivrednik(poljoprivrednik) {}

  async updatePreduzetnik(preduzetnik) {}
}
