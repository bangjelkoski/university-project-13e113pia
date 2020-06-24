import { Component } from '@angular/core';
import { PoljoprivrednikService } from 'src/app/services/poljoprivrednik/poljoprivrednik.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent {
  createForm: FormGroup;

  name: FormControl;
  location: FormControl;
  width: FormControl;
  length: FormControl;

  constructor(
    private formBuilder: FormBuilder,
    private poljoprivrednikService: PoljoprivrednikService
  ) {
    this.name = new FormControl('', [Validators.required]);
    this.location = new FormControl('', [Validators.required]);
    this.width = new FormControl('', [Validators.required, Validators.min(1)]);
    this.length = new FormControl('', [Validators.required, Validators.min(1)]);

    this.createForm = this.formBuilder.group({
      name: this.name,
      location: this.location,
      width: this.width,
      length: this.length,
    });
  }

  async onSubmit() {
    await this.poljoprivrednikService.kreirajRasadnika({
      name: this.name.value,
      location: this.location.value,
      width: this.width.value,
      length: this.length.value,
    });
  }
}
