import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { PoljoprivrednikService } from 'src/app/services/poljoprivrednik/poljoprivrednik.service';

@Component({
  selector: 'app-temperature-modal',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.scss'],
})
export class TemperatureComponent implements OnInit {
  @Input() rasadnik;
  @Input() isOpen: boolean;

  @Output() closed = new EventEmitter<boolean>();
  @Output() updated = new EventEmitter();

  temperatureForm: FormGroup;
  temperature: FormControl;

  constructor(
    private formBuilder: FormBuilder,
    private poljoprivrednikService: PoljoprivrednikService
  ) {
    this.temperature = new FormControl(Validators.required);

    this.temperatureForm = new FormGroup({
      temperature: this.temperature,
    });
  }

  ngOnInit() {
    this.temperature.setValue(this.rasadnik.temperature);
  }

  onClose() {
    this.closed.emit();
  }

  async onSubmit() {
    await this.poljoprivrednikService.setRasadnikTemperature(
      this.rasadnik.id,
      this.temperature.value
    );

    this.updated.emit({
      ...this.rasadnik,
      temperature: this.temperature.value,
    });
  }
}
