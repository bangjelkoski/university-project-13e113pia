import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { PoljoprivrednikService } from 'src/app/services/poljoprivrednik/poljoprivrednik.service';

@Component({
  selector: 'app-sadnik-new',
  templateUrl: './sadnik-new.component.html',
  styleUrls: ['./sadnik-new.component.scss'],
})
export class SadnikNewComponent {
  @Input() rasadnik;
  @Input() sadnici = [];
  @Output() created = new EventEmitter();

  sadnikForm: FormGroup;
  sadnik: FormControl;

  constructor(
    private formBuilder: FormBuilder,
    private poljoprivrednikService: PoljoprivrednikService
  ) {
    this.sadnik = new FormControl('', Validators.required);

    this.sadnikForm = new FormGroup({
      sadnik: this.sadnik,
    });
  }

  async onDodajSadnik() {
    const newSadnik = await this.poljoprivrednikService.dodajSadnik(
      this.rasadnik.id,
      this.sadnik.value
    );

    this.created.emit(newSadnik);
  }
}
