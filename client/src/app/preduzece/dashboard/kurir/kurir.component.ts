import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { PreduzeceService } from 'src/app/services/preduzece/preduzece.service';

@Component({
  selector: 'app-preduzece-kurir',
  templateUrl: './kurir.component.html',
  styleUrls: ['./kurir.component.scss'],
})
export class KurirComponent {
  @Input() slobodniKuriri;
  @Input() narudzbina;
  @Input() isOpen;

  @Output() zatvoren = new EventEmitter<boolean>();
  @Output() dodeljen = new EventEmitter();

  kurirForm: FormGroup;
  kurir: FormControl;

  constructor(
    private formBuilder: FormBuilder,
    private preduzeceService: PreduzeceService
  ) {
    this.kurir = new FormControl('', Validators.required);

    this.kurirForm = new FormGroup({
      kurir: this.kurir,
    });
  }

  async onSubmit() {
    const { narudzbina, kurir } = await this.preduzeceService.dodeliKurira(
      this.kurir.value,
      this.narudzbina.id
    );

    this.dodeljen.emit({ narudzbina, kurir });
  }

  onClose() {
    this.zatvoren.emit();
  }
}
