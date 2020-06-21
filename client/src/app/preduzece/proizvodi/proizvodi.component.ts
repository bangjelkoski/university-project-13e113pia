import { Component, OnInit } from '@angular/core';
import { PreduzeceService } from 'src/app/services/preduzece/preduzece.service';
import { TipProizvoda } from 'src/types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preduzece-proizvodi',
  templateUrl: './proizvodi.component.html',
  styleUrls: ['./proizvodi.component.scss'],
})
export class ProizvodiComponent implements OnInit {
  proizvodi = [];

  constructor(
    private preduzeceService: PreduzeceService,
    private router: Router
  ) {}

  async ngOnInit() {
    const proizvodi = await this.preduzeceService.getProizvodi();

    this.proizvodi = proizvodi.map((proizvod) => {
      const valueInHours = Math.floor(proizvod.value / (1000 * 60));
      const valueToString =
        proizvod.type == TipProizvoda.preparat
          ? `Убрзава раст за ~${valueInHours} мин.`
          : `Развија се за ~${valueInHours} мин.`;

      return {
        ...proizvod,
        image: `${proizvod.image}?random=${proizvod.id}`,
        valueToString,
      };
    });
  }

  async onDelete({ id }) {
    await this.preduzeceService.obrisiProizvod(id);

    this.proizvodi = this.proizvodi.filter((proizvod) => proizvod.id !== id);
  }

  onDetails({ id }) {
    this.router.navigate([`preduzece/proizvodi/${id}`]);
  }
}
