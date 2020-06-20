import { Component, OnInit } from '@angular/core';
import { ViewService } from 'src/app/services/view/view.service';
import { AdminService } from 'src/app/services/admin/admin.service';
import { Status } from 'src/types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-poljoprivrednici',
  templateUrl: './poljoprivrednici.component.html',
  styleUrls: ['./poljoprivrednici.component.scss'],
})
export class PoljoprivredniciComponent implements OnInit {
  poljoprivrednici = [];
  Status = Status;

  constructor(
    private viewService: ViewService,
    private adminService: AdminService,
    private router: Router
  ) {
    this.viewService.setTitle('Пољопривредници');
  }

  async ngOnInit() {
    const poljoprivrednici = await this.adminService.getPoljoprivrednici();
    this.poljoprivrednici = poljoprivrednici.map((poljoprivrednik) => {
      return {
        ...poljoprivrednik,
        Poljoprivrednik: {
          ...poljoprivrednik.Poljoprivrednik,
          birthDate: new Date(
            poljoprivrednik.Poljoprivrednik.birthDate
          ).toLocaleDateString('sr-Latn-RS'),
        },
      };
    });
  }

  async izmeni({ id }) {
    console.log(id);
    this.router.navigate([`/admin/korisnik/${id}`]);
  }

  async obrisi({ id }) {
    await this.adminService.obrisi(id);
    this.poljoprivrednici = this.poljoprivrednici.filter(
      (korisnik) => korisnik.id !== id
    );
  }

  async odobri({ id }) {
    await this.adminService.odobri(id);
    this.poljoprivrednici = this.poljoprivrednici.map((korisnik) => {
      if (!korisnik.id === id) {
        return korisnik;
      }

      return {
        ...korisnik,
        status: Status.odobren,
      };
    });
  }

  async odbij({ id }) {
    await this.adminService.odbij(id);
    this.poljoprivrednici = this.poljoprivrednici.map((korisnik) => {
      if (!korisnik.id === id) {
        return korisnik;
      }

      return {
        ...korisnik,
        status: Status.odbijen,
      };
    });
  }
}
