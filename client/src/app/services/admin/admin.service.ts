import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { HttpService } from '../http/http.service';
import { Status, Role } from 'src/types';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(
    private httpService: HttpService,
    private toast: ToastrService,
    private router: Router
  ) {}

  async getKorisniciNaCekanju() {
    return await this.httpService.get('korisnici/na-cekanju');
  }

  async getPoljoprivrednici() {
    return await this.httpService.get('korisnici/poljoprivrednici');
  }

  async getPreduzeca() {
    return await this.httpService.get('korisnici/preduzeca');
  }

  async getKorisnik(id: string) {
    try {
      return await this.httpService.get(`korisnici/${id}`);
    } catch (error) {
      return this.toast.error(error.message);
    }
  }

  async updateKorisnik({ id, username, password, phone, email, role }) {
    try {
      await this.httpService.post(`korisnici/${id}`, {
        username,
        password,
        phone,
        email,
      });
      this.toast.success('Корисник успешно ажуриран.');

      if (role === Role.poljoprivrednik) {
        return this.router.navigate(['/admin/poljoprivrednici']);
      }

      return this.router.navigate(['/admin/preduzeca']);
    } catch (error) {
      return this.toast.error(error.message);
    }
  }

  async odobri(id: string) {
    try {
      await this.httpService.post(`korisnici/${id}/odobri`);
      this.toast.success('Успешна одобрен корисник.');
    } catch (error) {
      return this.toast.error(error.message);
    }
  }

  async odbij(id: string) {
    try {
      await this.httpService.post(`korisnici/${id}/odbij`);
      this.toast.success('Успешна одбијен корисник.');
    } catch (error) {
      return this.toast.error(error.message);
    }
  }

  async obrisi(id: string) {
    try {
      await this.httpService.delete(`korisnici/${id}`);
      this.toast.success('Успешнo обрисан корисник.');
    } catch (error) {
      return this.toast.error(error.message);
    }
  }
}
