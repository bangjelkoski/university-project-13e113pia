import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class PreduzeceService {
  preduzece;
  korisnik;

  constructor(
    private httpService: HttpService,
    private authService: AuthService,
    private toast: ToastrService,
    private router: Router
  ) {
    this.korisnik = this.authService.korisnik();
    this.preduzece = this.korisnik.Preduzece;
  }

  async getNarudzbine() {
    return await this.httpService.get(`narudzbine/${this.preduzece.id}`);
  }

  async getKuriri() {
    return await this.httpService.get(`kuriri/${this.preduzece.id}`);
  }

  async getProizvodi() {
    return await this.httpService.get(`proizvodi/${this.preduzece.id}`);
  }

  async getKomentari(proizvodId) {
    return await this.httpService.get(`komentari/${proizvodId}`);
  }

  async getOcene(proizvodId) {
    return await this.httpService.get(`ocene/${proizvodId}`);
  }

  async getProizvod(id) {
    return await this.httpService.get(`proizvodi/${this.preduzece.id}/${id}`);
  }

  async kreirajProizvoda({
    name,
    manufacturer,
    description,
    image,
    price,
    type,
    quantity,
    value,
  }) {
    try {
      await this.httpService.post(`proizvodi/${this.preduzece.id}`, {
        name,
        manufacturer,
        description,
        image,
        price,
        type,
        quantity,
        value,
      });
      this.toast.success('Успешнo креиран производ.');
      this.router.navigate(['/preduzece/proizvodi']);
    } catch (error) {
      return this.toast.error(error.message);
    }
  }

  async dodeliKurira(id, narudzbinaId) {
    try {
      // Demo
      var inAWeek = new Date();
      var weekInMilliseconds = 7 * 24 * 60 * 60 * 1000;
      inAWeek.setTime(inAWeek.getTime() + weekInMilliseconds);

      const response = await this.httpService.post(`kuriri/dodeli`, {
        id,
        narudzbinaId,
        zauzetDo: inAWeek,
      });
      this.toast.success('Успешнo додељен курир.');

      return response;
    } catch (error) {
      return this.toast.error(error.message);
    }
  }

  async odobriNarudzbinu(id: string) {
    try {
      await this.httpService.post(
        `narudzbine/${this.preduzece.id}/${id}/odobri`
      );
      this.toast.success('Успешнo одобренa наруђбина.');
    } catch (error) {
      return this.toast.error(error.message);
    }
  }

  async odbijNarudzbinu(id: string) {
    try {
      await this.httpService.post(
        `narudzbine/${this.preduzece.id}/${id}/odbij`
      );
      this.toast.success('Успешна одбијенa наруђбина.');
    } catch (error) {
      return this.toast.error(error.message);
    }
  }

  async obrisiProizvod(id: string) {
    try {
      await this.httpService.delete(`proizvodi/${this.preduzece.id}/${id}`);
      this.toast.success('Успешнo обрисан производ.');
    } catch (error) {
      return this.toast.error(error.message);
    }
  }
}
