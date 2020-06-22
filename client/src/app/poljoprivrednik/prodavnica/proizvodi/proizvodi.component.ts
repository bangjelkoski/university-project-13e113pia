import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { Router } from '@angular/router';
import { TipProizvoda } from 'src/types';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { PoljoprivrednikService } from 'src/app/services/poljoprivrednik/poljoprivrednik.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-preduzece-list-proizvodi',
  templateUrl: './proizvodi.component.html',
  styleUrls: ['./proizvodi.component.scss'],
})
export class ProizvodiComponent implements OnInit {
  proizvodi = [];

  isNarudzbinaModalOpen = false;

  @Input() rasadnici = [];
  @Input() preduzece;

  @Output() novaNarudzbina = new EventEmitter();

  rasadnik: FormControl;
  narudzbina: FormGroup;
  kolicine: Array<FormControl> = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toast: ToastrService,
    private poljoprivrednikService: PoljoprivrednikService
  ) {}

  async ngOnInit() {
    this.getProizvodi();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.getProizvodi();
  }

  getProizvodi() {
    const proizvodi = this.preduzece.Proizvodi.map((proizvod) => {
      const valueInHours = Math.floor(proizvod.value / (1000 * 60));
      const valueToString =
        proizvod.type == TipProizvoda.preparat
          ? `Убрзава раст за ~${valueInHours} мин.`
          : `Развија се за ~${valueInHours} мин.`;

      return {
        ...proizvod,
        image: `${proizvod.image}?random=${proizvod.id}`,
        valueToString,
      };
    });

    let kolicine = [];
    proizvodi.forEach((proizvod) => {
      kolicine[proizvod.id] = new FormControl(0);
    });

    proizvodi.forEach((proizvod) => {
      this.kolicine[proizvod.id] = kolicine[proizvod.id];
    });

    this.rasadnik = new FormControl('', Validators.required);
    this.narudzbina = this.formBuilder.group({
      ...kolicine,
      rasadnik: this.rasadnik,
    });
    this.proizvodi = proizvodi;
  }

  onIncreaseQuantity({ id, quantity }) {
    this.kolicine[id].setValue(
      this.kolicine[id].value + 1 <= quantity
        ? this.kolicine[id].value + 1
        : quantity
    );
  }

  onDecreaseQuantity({ id }) {
    this.kolicine[id].setValue(
      this.kolicine[id].value - 1 > 0 ? this.kolicine[id].value - 1 : 0
    );
  }

  onDetails({ id, PreduzeceId }) {
    this.router.navigate([
      `/poljoprivrednik/prodavnica/${PreduzeceId}/proizvod/${id}`,
    ]);
  }

  onNarudzbinaModalOpen() {
    this.isNarudzbinaModalOpen = true;
  }

  onNarudzbinaModalClose() {
    this.isNarudzbinaModalOpen = false;
  }

  async onNarudzbina() {
    const proizvodi = Object.keys(this.kolicine)
      .filter((key) => this.kolicine[key].value)
      .map((key) => {
        const proizvod = this.proizvodi.find((p) => p.id === parseInt(key));

        return {
          ...proizvod,
          quantity: this.kolicine[key].value,
        };
      });

    if (!proizvodi.length) {
      return this.toast.error('Нисте изабрали ниједан производ');
    }

    const updatedProizvodi = await this.poljoprivrednikService.narudzbina({
      rasadnikId: this.rasadnik.value,
      proizvodi,
    });

    this.onNarudzbinaModalClose();
    this.novaNarudzbina.emit(updatedProizvodi);
  }
}
