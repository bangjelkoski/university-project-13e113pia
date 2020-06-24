import { Component, OnInit } from '@angular/core';
import { PoljoprivrednikService } from 'src/app/services/poljoprivrednik/poljoprivrednik.service';
import { ViewService } from 'src/app/services/view/view.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-prodavnica',
  templateUrl: './prodavnica.component.html',
  styleUrls: ['./prodavnica.component.scss'],
})
export class ProdavnicaComponent implements OnInit {
  rasadnici = [];
  preduzeca = [];

  searchForm: FormGroup;
  search: FormControl;

  constructor(
    private poljoprivrednikService: PoljoprivrednikService,
    public viewService: ViewService
  ) {
    this.viewService.setTitle('Продавница');
    this.search = new FormControl('');
    this.searchForm = new FormGroup({
      search: this.search,
    });
  }

  async ngOnInit() {
    this.rasadnici = await this.poljoprivrednikService.getRasadnici();
    this.preduzeca = await this.poljoprivrednikService.getPreduzeca();
  }

  onNovaNarudzbina(noviProizvodi, preduzece) {
    const index = this.preduzeca.findIndex((p) => p.id === preduzece.id);
    const newPreduzece = {
      ...this.preduzeca[index],
      Proizvodi: noviProizvodi,
    };
    this.preduzeca.splice(index, 1, newPreduzece);
  }
}
