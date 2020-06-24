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

  async getProizvod(proizvodId, preduzeceId) {
    return await this.httpService.get(`proizvodi/${preduzeceId}/${proizvodId}`);
  }

  async getKomentari(proizvodId) {
    return await this.httpService.get(`komentari/${proizvodId}`);
  }

  async getOcene(proizvodId) {
    return await this.httpService.get(`ocene/${proizvodId}`);
  }

  async komentiraj({ proizvodId, komentar }) {
    const noviKomentar = await this.httpService.post(
      `komentari/${proizvodId}`,
      { komentar, korisnikId: this.korisnik.id }
    );

    this.toast.success('Успешнo коментарисано');

    return noviKomentar;
  }

  async kreirajRasadnika({ name, location, length, width }) {
    try {
      await this.httpService.post(`rasadnici/${this.poljoprivrednik.id}`, {
        name,
        location,
        length,
        width,
      });
      this.toast.success('Успешнo креиран расадник.');
      this.router.navigate(['/poljoprivrednik']);
    } catch (error) {
      return this.toast.error(error.message);
    }
  }

  async oceni({ proizvodId, ocena }) {
    const novaOcena = await this.httpService.post(`ocene/${proizvodId}`, {
      ocena,
      korisnikId: this.korisnik.id,
    });

    this.toast.success('Успешнo оцењено');

    return novaOcena;
  }

  async getRasadnici() {
    return await this.httpService.get(`rasadnici/${this.poljoprivrednik.id}`);
  }

  async getPreduzeca() {
    return await this.httpService.get(`preduzeca`);
  }

  async kupioProizvod(id, proizvodId) {
    return await this.httpService.get(
      `/korisnici/${id}/narucio-proizvod/${proizvodId}`
    );
  }

  async narudzbina({ rasadnikId, proizvodi }) {
    const updatedProizvodi = await this.httpService.post(`narudzbine`, {
      rasadnikId,
      proizvodi,
    });
    this.toast.success('Успешна наруђбина');

    return updatedProizvodi;
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
