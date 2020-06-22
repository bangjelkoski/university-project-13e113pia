import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { PoljoprivrednikService } from 'src/app/services/poljoprivrednik/poljoprivrednik.service';

@Component({
  selector: 'app-sadnik',
  templateUrl: './sadnik.component.html',
  styleUrls: ['./sadnik.component.scss'],
})
export class SadnikComponent implements OnInit {
  transformedSadnik;
  transformedPreparati;

  isModalOpen = false;

  @Input() sadnik;
  @Input() preparati = [];
  @Output() updated = new EventEmitter();

  preparatForm: FormGroup;
  preparat: FormControl;

  constructor(
    private formBuilder: FormBuilder,
    private poljoprivrednikService: PoljoprivrednikService
  ) {
    this.preparat = new FormControl('', Validators.required);

    this.preparatForm = new FormGroup({
      preparat: this.preparat,
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.getTransformedSadnik();
    this.getTransformedPreparati();
  }

  ngOnInit(): void {
    this.getTransformedPreparati();
    this.getTransformedSadnik();
  }

  async onDodajPreparat() {
    const updatedSadnik = await this.poljoprivrednikService.dodajPreparat(
      this.sadnik.id,
      this.preparat.value
    );

    this.onModalClose();
    this.updated.emit(updatedSadnik);
  }

  async onIzvadiSadnik() {
    const updatedSadnik = await this.poljoprivrednikService.izvadiSadnik(
      this.sadnik.id
    );

    this.onModalClose();
    this.updated.emit(updatedSadnik);
  }

  onModalOpen() {
    this.isModalOpen = true;
  }

  onModalClose() {
    this.isModalOpen = false;
  }

  getTransformedPreparati() {
    this.transformedPreparati = this.preparati.map((preparat) => {
      return {
        ...preparat,
        formattedValue: `${Math.floor(preparat.value / (1000 * 60))} мин.`,
      };
    });
  }

  getTransformedSadnik() {
    const formattedIzvadiNa = this.sadnik.izvadiNa
      ? new Date(this.sadnik.izvadiNa).toLocaleDateString('sr-Latn-RS')
      : null;

    const vreme = Date.now();
    const vremeKreiranja = new Date(this.sadnik.createdAt).getTime();
    const vremeKrajaRazvijanaSadnika = vremeKreiranja + this.sadnik.ms;

    if (vremeKrajaRazvijanaSadnika <= vreme) {
      this.transformedSadnik = {
        ...this.sadnik,
        formattedIzvadiNa,
        style: `width: 100%`,
        progress: 100,
      };

      return;
    }

    const percentage = ((vreme - vremeKreiranja) / this.sadnik.ms) * 100;

    this.transformedSadnik = {
      ...this.sadnik,
      formattedIzvadiNa,
      style: `width: ${percentage}%`,
      percentage: percentage,
    };
  }
}
