import { Component, OnInit } from '@angular/core';
import { OrderStatus, TipProizvoda } from 'src/types';
import { PoljoprivrednikService } from 'src/app/services/poljoprivrednik/poljoprivrednik.service';
import { ViewService } from 'src/app/services/view/view.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-magacin',
  templateUrl: './magacin.component.html',
  styleUrls: ['./magacin.component.scss'],
})
export class MagacinComponent implements OnInit {
  magacin;
  proizvodi = [];

  OrderStatus = OrderStatus;

  constructor(
    private poljoprivrednikService: PoljoprivrednikService,
    public viewService: ViewService,
    private route: ActivatedRoute
  ) {
    this.viewService.setTitle('Магацин');
  }

  async ngOnInit() {
    const rasadnikId = this.route.snapshot.paramMap.get('id');
    const magacin = await this.poljoprivrednikService.getMagacin(rasadnikId);

    this.proizvodi = magacin.Narudzbine.reduce((prev, narudzbina) => {
      const proizvodi = narudzbina.NaruceniProizvodi.map((p) => {
        const valueInHours = Math.floor(p.value / (1000 * 60));
        const valueToString =
          p.type == TipProizvoda.preparat
            ? `Убрзава раст за ~${valueInHours} мин.`
            : `Развија се за ~${valueInHours} мин.`;

        return {
          ...p,
          valueToString,
          status: narudzbina.status,
        };
      });
      return [...prev, ...proizvodi];
    }, []);

    this.magacin = magacin;
  }

  async onDelete(proizvod) {
    await this.poljoprivrednikService.deleteProizvod(proizvod.id);
    this.proizvodi = this.proizvodi.filter(({ id }) => proizvod.id !== id);
  }
}
