import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DemoService {
  unavailable() {
    alert('Само за демо сврхе. :)');
  }
}
