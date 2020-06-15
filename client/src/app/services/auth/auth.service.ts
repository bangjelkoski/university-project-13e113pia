import { Injectable } from '@angular/core';
import { StorageService } from './../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private storageService: StorageService) {}

  loggedIn() {
    return this.storageService.has('user');
  }

  user() {
    return this.storageService.get('user');
  }
}
