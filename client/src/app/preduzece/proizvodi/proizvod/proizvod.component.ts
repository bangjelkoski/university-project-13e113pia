import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PreduzeceService } from 'src/app/services/preduzece/preduzece.service';

@Component({
  selector: 'app-proizvod',
  templateUrl: './proizvod.component.html',
  styleUrls: ['./proizvod.component.scss'],
})
export class ProizvodComponent implements OnInit {
  proizvod;
  komentari = [];
  ocene = [];

  constructor(
    private route: ActivatedRoute,
    private preduzeceService: PreduzeceService,
    private router: Router
  ) {}

  async ngOnInit() {
    const proizvodId = this.route.snapshot.paramMap.get('id');

    this.proizvod = await this.preduzeceService.getProizvod(proizvodId);

    const komentari = await this.preduzeceService.getKomentari(proizvodId);
    const ocene = await this.preduzeceService.getOcene(proizvodId);

    this.komentari = komentari.map((komentar) => {
      return {
        ...komentar,
        formattedCreatedAt: new Date(komentar.createdAt).toLocaleDateString(
          'sr-Latn-RS'
        ),
      };
    });

    this.ocene = ocene.map((ocena) => {
      return {
        ...ocena,
        formattedCreatedAt: new Date(ocena.createdAt).toLocaleDateString(
          'sr-Latn-RS'
        ),
      };
    });
  }

  async onDelete() {
    await this.preduzeceService.obrisiProizvod(this.proizvod.id);

    this.router.navigate(['/preduzece/proizvodi']);
  }
}
