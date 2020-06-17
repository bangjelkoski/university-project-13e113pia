import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class DemoService {
  unavailable() {
    alert('Само за демо сврхе. :)');
  }
}
