import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PreduzeceService } from 'src/app/services/preduzece/preduzece.service';

@Component({
  selector: 'app-proizvod-form',
  templateUrl: './proizvod-form.component.html',
  styleUrls: ['./proizvod-form.component.scss'],
})
export class ProizvodFormComponent {
  createForm: FormGroup;

  name: FormControl;
  manufacturer: FormControl;
  description: FormControl;
  image: FormControl;
  price: FormControl;
  type: FormControl;
  quantity: FormControl;
  value: FormControl;

  /**
   * name, description,
   * manufacturer, price, quantity,
   * type, value,
   */
  constructor(
    private formBuilder: FormBuilder,
    private preduzeceService: PreduzeceService
  ) {
    this.name = new FormControl('', [Validators.required]);
    this.manufacturer = new FormControl('', [Validators.required]);
    this.description = new FormControl('', [Validators.required]);
    this.image = new FormControl('', [Validators.required]);
    this.price = new FormControl('', [
      Validators.required,
      Validators.min(0.01),
    ]);
    this.type = new FormControl('', [Validators.required]);
    this.quantity = new FormControl('', [
      Validators.required,
      Validators.min(1),
    ]);
    this.value = new FormControl('', [Validators.required, Validators.min(1)]);

    this.createForm = this.formBuilder.group({
      name: this.name,
      manufacturer: this.manufacturer,
      description: this.description,
      image: this.image,
      price: this.price,
      type: this.type,
      quantity: this.quantity,
      value: this.value,
    });
  }

  async onSubmit() {
    await this.preduzeceService.kreirajProizvoda({
      name: this.name.value,
      manufacturer: this.manufacturer.value,
      description: this.description.value,
      image: this.image.value,
      price: this.price.value,
      type: this.type.value,
      quantity: this.quantity.value,
      value: this.value.value,
    });
  }
}
