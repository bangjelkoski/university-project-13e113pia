import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PreduzeceService } from 'src/app/services/preduzece/preduzece.service';
import { ViewService } from 'src/app/services/view/view.service';
import { OrderStatus } from 'src/types';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  korisnik;

  narudzbine = [];
  proizvodi = [];
  kuriri = [];
  slobodniKuriri = [];
  narudzbina;

  constructor(
    private authService: AuthService,
    private preduzeceService: PreduzeceService,
    public viewService: ViewService
  ) {
    this.viewService.setTitle('Почетна');
    this.korisnik = this.authService.korisnik();
  }

  async ngOnInit() {
    this.narudzbine = await this.preduzeceService.getNarudzbine();
    this.narudzbine.sort((a, b) => {
      if (
        a.status === OrderStatus.naCekanju &&
        b.status !== OrderStatus.naCekanju
      ) {
        return -1;
      }

      return 1;
    });

    this.proizvodi = await this.preduzeceService.getProizvodi();
    this.kuriri = await this.preduzeceService.getKuriri();
    this.slobodniKuriri = this.getSlobodniKuriri();
  }

  getSlobodniKuriri() {
    return this.kuriri.filter((kurir) => {
      if (kurir.Narudzbina) {
        return false;
      }

      const zauzetDo = new Date(kurir.zauzetDo);
      const secondsSinceEpoch = Math.round(zauzetDo.getTime() / 1000);

      return secondsSinceEpoch < Math.floor(Date.now() / 1000);
    });
  }

  getTotalProizvodi(): number {
    return this.proizvodi.length;
  }

  getTotalNarudzbine(): number {
    return this.narudzbine.length;
  }

  onIzaberiKurir(narudzbina) {
    this.narudzbina = narudzbina;
  }

  onKurirModalClose() {
    this.narudzbina = null;
  }

  onDodeljen({ narudzbina, kurir }) {
    const filteredNarudzbine = this.narudzbine.filter(
      (n) => n.id !== narudzbina.id
    );
    this.narudzbine = [...filteredNarudzbine, narudzbina];

    const filteredKuriri = this.kuriri.filter((k) => k.id !== kurir.id);
    this.kuriri = [...filteredKuriri, kurir];
    this.slobodniKuriri = this.getSlobodniKuriri();

    this.onKurirModalClose();
  }

  onOdobrena(id) {
    this.narudzbine = this.narudzbine.map((narudzbina) => {
      if (!(narudzbina.id === id)) {
        return narudzbina;
      }

      return {
        ...narudzbina,
        status: OrderStatus.odobrena,
      };
    });
  }

  onOdbijena(id) {
    this.narudzbine = this.narudzbine.map((narudzbina) => {
      if (!(narudzbina.id === id)) {
        return narudzbina;
      }

      return {
        ...narudzbina,
        status: OrderStatus.odbijena,
      };
    });
  }
}
