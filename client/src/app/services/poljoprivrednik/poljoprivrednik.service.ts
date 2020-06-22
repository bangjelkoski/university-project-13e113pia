import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root',
})
export class PoljoprivrednikService {
  poljoprivrednik;
  korisnik;

  constructor(
    private httpService: HttpService,
    private authService: AuthService,
    private toast: ToastrService,
    private router: Router
  ) {
    this.korisnik = this.authService.korisnik();
    this.poljoprivrednik = this.korisnik.Poljoprivrednik;
  }

  async getRasadnici() {
    return await this.httpService.get(`rasadnici/${this.poljoprivrednik.id}`);
  }

  async setRasadnikTemperature(id, temperature) {
    await this.httpService.post(`rasadnici/${id}/temperature`, {
      temperature,
    });
    this.toast.success('Успешнo ажуриран расадник.');
  }
  async setRasadnikWaterLevel(id, waterLevel) {
    await this.httpService.post(`rasadnici/${id}/water-level`, {
      waterLevel,
    });
    this.toast.success('Успешнo ажуриран расадник.');
  }

  async getRasadnik(rasadnikId) {
    return await this.httpService.get(
      `rasadnici/${this.poljoprivrednik.id}/${rasadnikId}`
    );
  }

  async getMagacin(rasadnikId) {
    return await this.httpService.get(
      `magacini/${this.poljoprivrednik.id}/${rasadnikId}`
    );
  }

  async dodajPreparat(sadnikId, preparatId) {
    return await this.httpService.post(
      `sadnici/${sadnikId}/preparat/${preparatId}`
    );
  }

  async dodajSadnik(rasadnikId, sadnikId) {
    return await this.httpService.post(
      `sadnici/${rasadnikId}/dodaj/${sadnikId}`
    );
  }

  async izvadiSadnik(sadnikId) {
    return await this.httpService.post(`sadnici/${sadnikId}/izvadi`);
  }

  async deleteProizvod(proizvodId) {
    await this.httpService.delete(`proizvodi/narucen/${proizvodId}`);
    this.toast.success('Успешнo обрисан производ.');
  }
}
