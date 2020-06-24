import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PoljoprivrednikService } from 'src/app/services/poljoprivrednik/poljoprivrednik.service';
import { TipProizvoda, OrderStatus } from 'src/types';
import { ViewService } from 'src/app/services/view/view.service';

@Component({
  selector: 'app-poljoprivrendik-rasadnik',
  templateUrl: './rasadnik.component.html',
  styleUrls: ['./rasadnik.component.scss'],
})
export class RasadnikComponent implements OnInit {
  rasadnik;
  magacin;
  narudzbine = [];
  preparati = [];
  sadnici = [];

  brSlobodnihSadnika;

  isWaterModalOpen = false;
  isTemperatureModalOpen = false;

  constructor(
    public viewService: ViewService,
    private route: ActivatedRoute,
    private poljoprivrednikService: PoljoprivrednikService
  ) {
    this.viewService.setTitle('Расадник');
  }

  async ngOnInit() {
    const rasadnikId = this.route.snapshot.paramMap.get('id');
    await this.getMagacin();

    this.rasadnik = await this.poljoprivrednikService.getRasadnik(rasadnikId);
    this.brSlobodnihSadnika =
      this.rasadnik.width * this.rasadnik.length - this.rasadnik.Sadnici.length;
  }

  async getMagacin() {
    const rasadnikId = this.route.snapshot.paramMap.get('id');
    const magacin = await this.poljoprivrednikService.getMagacin(rasadnikId);

    this.magacin = magacin;
    this.narudzbine = magacin.Narudzbine.filter((narudzbina) => {
      return narudzbina.status !== OrderStatus.naCekanju;
    });
    this.preparati = this.narudzbine.reduce((prev, narudzbina) => {
      return [
        ...prev,
        ...narudzbina.NaruceniProizvodi.filter(
          (p) => p.type === TipProizvoda.preparat && p.quantity > 0
        ),
      ];
    }, []);
    this.sadnici = this.narudzbine.reduce((prev, narudzbina) => {
      return [
        ...prev,
        ...narudzbina.NaruceniProizvodi.filter(
          (p) => p.type === TipProizvoda.sadnica && p.quantity > 0
        ),
      ];
    }, []);
  }

  async onSadnikUpdate(sadnik) {
    const sadnici = [...this.rasadnik.Sadnici];
    const index = sadnici.findIndex(({ id }) => sadnik.id === id);
    sadnici.splice(index, 1, sadnik);

    this.rasadnik = {
      ...this.rasadnik,
      Sadnici: sadnici,
    };

    // Updating quantities
    await this.getMagacin();
  }

  async onSadnikCreated(sadnik) {
    this.rasadnik = {
      ...this.rasadnik,
      Sadnici: [...this.rasadnik.Sadnici, sadnik],
    };

    this.brSlobodnihSadnika =
      this.rasadnik.width * this.rasadnik.length - this.rasadnik.Sadnici.length;

    // Updating quantities
    await this.getMagacin();
  }

  onUpdate(rasadnik) {
    this.rasadnik = { ...rasadnik };
    this.onModalClose();
  }

  onModalClose() {
    this.isWaterModalOpen = false;
    this.isTemperatureModalOpen = false;
  }

  onAddWater() {
    this.isWaterModalOpen = true;
  }

  onIncreaseTemperature() {
    this.isTemperatureModalOpen = true;
  }
}
