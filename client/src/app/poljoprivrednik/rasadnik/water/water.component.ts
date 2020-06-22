import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { PoljoprivrednikService } from 'src/app/services/poljoprivrednik/poljoprivrednik.service';

@Component({
  selector: 'app-water-modal',
  templateUrl: './water.component.html',
  styleUrls: ['./water.component.scss'],
})
export class WaterComponent {
  @Input() rasadnik;
  @Input() isOpen: boolean;

  @Output() closed = new EventEmitter<boolean>();
  @Output() updated = new EventEmitter();

  waterLevelForm: FormGroup;
  waterLevel: FormControl;

  constructor(
    private formBuilder: FormBuilder,
    private poljoprivrednikService: PoljoprivrednikService
  ) {
    this.waterLevel = new FormControl(Validators.required);

    this.waterLevelForm = new FormGroup({
      waterLevel: this.waterLevel,
    });
  }

  ngOnInit() {
    this.waterLevel.setValue(this.rasadnik.waterLevel);
  }

  onClose() {
    this.closed.emit();
  }

  async onSubmit() {
    await this.poljoprivrednikService.setRasadnikWaterLevel(
      this.rasadnik.id,
      this.waterLevel.value
    );

    this.updated.emit({
      ...this.rasadnik,
      waterLevel: this.waterLevel.value,
    });
  }
}
