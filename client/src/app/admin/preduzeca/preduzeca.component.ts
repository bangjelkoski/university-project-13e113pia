import { Component, OnInit } from '@angular/core';
import { ViewService } from 'src/app/services/view/view.service';
import { AdminService } from 'src/app/services/admin/admin.service';
import { Status } from 'src/types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-preduzeca',
  templateUrl: './preduzeca.component.html',
  styleUrls: ['./preduzeca.component.scss'],
})
export class PreduzecaComponent implements OnInit {
  preduzeca = [];
  Status = Status;

  constructor(
    private viewService: ViewService,
    private adminService: AdminService,
    private router: Router
  ) {
    this.viewService.setTitle('Предузећа');
  }

  async ngOnInit() {
    const preduzeca = await this.adminService.getPreduzeca();
    this.preduzeca = preduzeca.map((poljoprivrednik) => {
      return {
        ...poljoprivrednik,
        Preduzece: {
          ...poljoprivrednik.Preduzece,
          dateOfCreation: new Date(
            poljoprivrednik.Preduzece.dateOfCreation
          ).toLocaleDateString('sr-Latn-RS'),
        },
      };
    });
  }

  async izmeni({ id }) {
    this.router.navigate([`/admin/korisnik/${id}`]);
  }

  async obrisi({ id }) {
    await this.adminService.obrisi(id);
    this.preduzeca = this.preduzeca.filter((korisnik) => korisnik.id !== id);
  }

  async odobri({ id }) {
    await this.adminService.odobri(id);
    this.preduzeca = this.preduzeca.map((korisnik) => {
      if (!(korisnik.id === id)) {
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
    this.preduzeca = this.preduzeca.map((korisnik) => {
      if (!(korisnik.id === id)) {
        return korisnik;
      }

      return {
        ...korisnik,
        status: Status.odbijen,
      };
    });
  }
}
