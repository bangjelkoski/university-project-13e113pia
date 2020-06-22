import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoljoprivrednikService } from 'src/app/services/poljoprivrednik/poljoprivrednik.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-proizvod',
  templateUrl: './proizvod.component.html',
  styleUrls: ['./proizvod.component.scss'],
})
export class ProizvodComponent implements OnInit {
  komentarForm: FormGroup;
  ocenaForm: FormGroup;

  komentar: FormControl;
  ocena: FormControl;

  korisnik;

  proizvod;
  komentari = [];
  ocene = [];

  korisnikOstavioKomentar = false;
  korisnikOstavioOcenu = false;
  korisnikKupioProizvod = false;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private poljoprivrednikService: PoljoprivrednikService,
    private router: Router
  ) {
    this.korisnik = this.authService.korisnik();

    this.komentar = new FormControl('', Validators.required);
    this.ocena = new FormControl('', Validators.required);

    this.ocenaForm = new FormGroup({
      ocena: this.ocena,
    });
    this.komentarForm = new FormGroup({
      komentar: this.komentar,
    });
  }

  async ngOnInit() {
    const proizvodId = this.route.snapshot.paramMap.get('id');
    const preduzeceId = this.route.snapshot.paramMap.get('preduzeceId');
    this.proizvod = await this.poljoprivrednikService.getProizvod(
      proizvodId,
      preduzeceId
    );

    const komentari = await this.poljoprivrednikService.getKomentari(
      proizvodId
    );
    const ocene = await this.poljoprivrednikService.getOcene(proizvodId);

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

    if (
      this.komentari.find(
        (komentar) => komentar.KorisnikId === this.korisnik.id
      )
    ) {
      this.korisnikOstavioKomentar = true;
    }

    if (this.ocene.find((ocena) => ocena.KorisnikId === this.korisnik.id)) {
      this.korisnikOstavioOcenu = true;
    }

    this.korisnikKupioProizvod = await this.poljoprivrednikService.kupioProizvod(
      this.korisnik.id,
      proizvodId
    );
  }

  async onDodajOcenu() {
    const ocena = await this.poljoprivrednikService.oceni({
      proizvodId: this.proizvod.id,
      ocena: this.ocena.value,
    });

    this.ocene.push({
      ...ocena,
      formattedCreatedAt: new Date(ocena.createdAt).toLocaleDateString(
        'sr-Latn-RS'
      ),
    });
    this.korisnikOstavioOcenu = true;
  }

  async onDodajKomentar() {
    const komentar = await this.poljoprivrednikService.komentiraj({
      proizvodId: this.proizvod.id,
      komentar: this.komentar.value,
    });

    this.komentari.push({
      ...komentar,
      formattedCreatedAt: new Date(komentar.createdAt).toLocaleDateString(
        'sr-Latn-RS'
      ),
    });
    this.korisnikOstavioKomentar = true;
  }
}
