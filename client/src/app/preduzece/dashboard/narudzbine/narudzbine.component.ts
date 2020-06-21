import {
  Component,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';
import { PreduzeceService } from 'src/app/services/preduzece/preduzece.service';
import { OrderStatus } from 'src/types';

@Component({
  selector: 'app-preduzece-narudzbine',
  templateUrl: './narudzbine.component.html',
  styleUrls: ['./narudzbine.component.scss'],
})
export class NarudzbineComponent {
  transformedNarudzbine = [];

  @Input() narudzbine;
  @Output() odobrena = new EventEmitter<boolean>();
  @Output() odbijena = new EventEmitter<boolean>();
  @Output() izaberiKurir = new EventEmitter<boolean>();

  Status = OrderStatus;

  constructor(private preduzeceService: PreduzeceService) {}

  ngOnChanges(changes: SimpleChanges) {
    this.transformedNarudzbine = this.getTransformedNarudzbine();
  }

  getTransformedNarudzbine() {
    return this.narudzbine.map((narudzbina) => ({
      ...narudzbina,
      createdAt: new Date(narudzbina.createdAt).toLocaleDateString(
        'sr-Latn-RS'
      ),
    }));
  }

  onIzaberiKurir(narudzbina) {
    this.izaberiKurir.emit(narudzbina);
  }

  async odobri({ id }) {
    await this.preduzeceService.odobriNarudzbinu(id);
    this.odobrena.emit(id);
  }

  async odbij({ id }) {
    await this.preduzeceService.odbijNarudzbinu(id);
    this.odbijena.emit(id);
  }
}
